import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { USE_ENV_WHATSAPP_TOKEN } from "@/lib/whatsapp-env-token";

async function fetchPhoneNumberDisplay(phoneNumberId: string, token: string) {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v25.0/${phoneNumberId}?fields=display_phone_number,verified_name,whatsapp_business_account`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = (await res.json()) as {
      display_phone_number?: string;
      verified_name?: string;
      whatsapp_business_account?: { id?: string };
      error?: { message?: string };
    };
    if (data.error) return { displayName: null as string | null, phone: null as string | null, wabaId: null as string | null };
    return {
      displayName: data.verified_name ?? null,
      phone: data.display_phone_number ?? null,
      wabaId: data.whatsapp_business_account?.id ?? null,
    };
  } catch {
    return { displayName: null, phone: null, wabaId: null };
  }
}

async function requireUser(req: NextRequest) {
  const userId = getSessionUserId(req);
  if (!userId) return { error: NextResponse.json({ error: "Oturum yok", code: "NO_SESSION" }, { status: 401 }) };
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { error: NextResponse.json({ error: "Kullanıcı bulunamadı", code: "NO_SESSION" }, { status: 401 }) };
  return { user };
}

export async function GET(req: NextRequest) {
  try {
    const r = await requireUser(req);
    if ("error" in r) return r.error;
    const { user } = r;

    const envPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() || "";
    const envToken = process.env.WHATSAPP_TOKEN?.trim() || "";

    const rows = await prisma.integration.findMany({
      where: { userId: user.id, platform: "whatsapp", isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    const outboundTotal = await prisma.message.count({
      where: {
        direction: "outbound",
        conversation: { userId: user.id, channel: "whatsapp" },
      },
    });

    const lastOutbound = await prisma.message.findFirst({
      where: {
        direction: "outbound",
        conversation: { userId: user.id, channel: "whatsapp" },
      },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    const multi = rows.length > 1;
    const accounts = rows.map((row, index) => {
      let meta: { displayPhone?: string; wabaId?: string | null; source?: string } = {};
      try {
        if (row.metadata) meta = JSON.parse(row.metadata) as typeof meta;
      } catch {
        meta = {};
      }
      const wabaId = meta.wabaId ?? "—";
      const phone = meta.displayPhone ?? "—";
      const tokenSource =
        row.accessToken === USE_ENV_WHATSAPP_TOKEN || !row.accessToken ? "env" : "stored";

      return {
        id: row.id,
        integrationId: row.id,
        phoneNumberId: row.accountId ?? "",
        wabaId: typeof wabaId === "string" ? wabaId : "—",
        displayName: row.accountName || "WhatsApp",
        phone,
        status: row.isActive ? ("active" as const) : ("error" as const),
        messagesSent: multi ? null : outboundTotal,
        lastActivity: lastOutbound?.createdAt
          ? formatRelative(lastOutbound.createdAt)
          : formatRelative(row.updatedAt),
        isDefault: index === 0,
        tokenSource,
      };
    });

    return NextResponse.json({
      accounts,
      stats: { outboundMessages: outboundTotal },
      metaAppId: process.env.META_APP_ID || "",
      envConfigured: Boolean(envPhoneId && envToken),
    });
  } catch (e) {
    console.error("whatsapp/accounts GET", e);
    return NextResponse.json({ error: "Hesaplar yüklenemedi" }, { status: 500 });
  }
}

function formatRelative(d: Date) {
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return "Az önce";
  if (sec < 3600) return `${Math.floor(sec / 60)} dk önce`;
  if (sec < 86400) return `${Math.floor(sec / 3600)} saat önce`;
  return d.toLocaleDateString("tr-TR");
}

export async function POST(req: NextRequest) {
  try {
    const r = await requireUser(req);
    if ("error" in r) return r.error;
    const { user } = r;

    const body = (await req.json()) as {
      displayName: string;
      phoneNumberId: string;
      wabaId?: string;
      accessToken?: string;
    };

    if (!body.displayName?.trim() || !body.phoneNumberId?.trim()) {
      return NextResponse.json({ error: "Hesap adı ve Phone Number ID zorunlu" }, { status: 400 });
    }

    const phoneNumberId = body.phoneNumberId.replace(/\D/g, "");
    const token = body.accessToken?.trim() || USE_ENV_WHATSAPP_TOKEN;
    const envToken = process.env.WHATSAPP_TOKEN?.trim();

    let metaPhone: string | null = null;
    let metaName: string | null = null;
    let metaWaba: string | null = body.wabaId?.trim() || null;

    if (token !== USE_ENV_WHATSAPP_TOKEN) {
      const m = await fetchPhoneNumberDisplay(phoneNumberId, token);
      metaPhone = m.phone;
      metaName = m.displayName;
      metaWaba = metaWaba || m.wabaId;
    } else if (envToken) {
      const m = await fetchPhoneNumberDisplay(phoneNumberId, envToken);
      metaPhone = m.phone;
      metaName = m.displayName;
      metaWaba = metaWaba || m.wabaId;
    }

    const row = await prisma.integration.upsert({
      where: {
        userId_platform_accountId: {
          userId: user.id,
          platform: "whatsapp",
          accountId: phoneNumberId,
        },
      },
      create: {
        userId: user.id,
        platform: "whatsapp",
        accountId: phoneNumberId,
        accountName: metaName || body.displayName.trim(),
        accessToken: token,
        metadata: JSON.stringify({
          displayPhone: metaPhone,
          wabaId: metaWaba,
          source: "manual",
        }),
      },
      update: {
        accountName: metaName || body.displayName.trim(),
        accessToken: token,
        isActive: true,
        metadata: JSON.stringify({
          displayPhone: metaPhone,
          wabaId: metaWaba,
          source: "manual",
        }),
      },
    });

    return NextResponse.json({
      ok: true,
      account: {
        id: row.id,
        integrationId: row.id,
        phoneNumberId: row.accountId ?? "",
        wabaId: metaWaba ?? "—",
        displayName: row.accountName,
        phone: metaPhone ?? "—",
        status: "active" as const,
        messagesSent: 0,
        lastActivity: "—",
        isDefault: false,
        tokenSource: token === USE_ENV_WHATSAPP_TOKEN ? "env" : "stored",
      },
    });
  } catch (e) {
    console.error("whatsapp/accounts POST", e);
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const r = await requireUser(req);
    if ("error" in r) return r.error;
    const { user } = r;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });

    const row = await prisma.integration.findFirst({
      where: { id, userId: user.id, platform: "whatsapp" },
    });
    if (!row) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

    await prisma.integration.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("whatsapp/accounts DELETE", e);
    return NextResponse.json({ error: "Silinemedi" }, { status: 500 });
  }
}
