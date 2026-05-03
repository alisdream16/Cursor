import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";

const CHANNEL_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
};

export async function GET(req: NextRequest) {
  const userId = getSessionUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Oturum yok", code: "NO_SESSION" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı", code: "NO_SESSION" }, { status: 401 });
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { lastAt: "desc" },
    take: 80,
    include: {
      contact: { select: { id: true, name: true, phone: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, direction: true, createdAt: true },
      },
    },
  });

  const items = conversations.map((c) => ({
    id: c.id,
    channel: c.channel,
    channelLabel: CHANNEL_LABEL[c.channel] ?? c.channel,
    externalId: c.externalId,
    status: c.status,
    lastMessage: c.lastMessage ?? c.messages[0]?.content ?? "",
    lastAt: c.lastAt.toISOString(),
    contactName: c.contact?.name ?? c.externalId ?? "Bilinmiyor",
    contactPhone: c.contact?.phone ?? null,
  }));

  const integrations = await prisma.integration.findMany({
    where: { userId, isActive: true, platform: { in: ["whatsapp", "instagram", "facebook"] } },
    select: { platform: true, accountName: true, accountId: true },
  });

  return NextResponse.json({
    conversations: items,
    integrations: integrations.map((i) => ({
      platform: i.platform,
      label: i.accountName,
      accountId: i.accountId,
    })),
  });
}
