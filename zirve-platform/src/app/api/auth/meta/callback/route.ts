import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const APP_ID = process.env.META_APP_ID!;
const APP_SECRET = process.env.META_APP_SECRET!;

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;

  const fail = (codeErr: string) =>
    NextResponse.redirect(`${origin}/dashboard/baglanti?error=${encodeURIComponent(codeErr)}`);

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) return fail("cancelled");
  if (!code) return fail("no_code");

  let stateData = { platform: "all", userId: "", ts: 0 };
  try {
    stateData = JSON.parse(Buffer.from(state || "", "base64").toString()) as typeof stateData;
  } catch {
    return fail("bad_state");
  }

  if (!stateData.userId) return fail("no_user");

  const callbackUrl = `${origin}/api/auth/meta/callback`;

  try {
    const tokenRes = await fetch(
      `https://graph.facebook.com/v25.0/oauth/access_token?` +
        `client_id=${APP_ID}&` +
        `redirect_uri=${encodeURIComponent(callbackUrl)}&` +
        `client_secret=${APP_SECRET}&` +
        `code=${code}`
    );
    const tokenData = (await tokenRes.json()) as {
      access_token?: string;
      error?: { message?: string; type?: string; code?: number };
    };
    if (tokenData.error || !tokenData.access_token) {
      const msg = tokenData.error?.message || "token_error";
      console.error("Token alma hatası:", tokenData.error);
      return fail(`token_failed:${msg.slice(0, 120)}`);
    }

    const shortToken = tokenData.access_token;

    const longTokenRes = await fetch(
      `https://graph.facebook.com/v25.0/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${APP_ID}&` +
        `client_secret=${APP_SECRET}&` +
        `fb_exchange_token=${encodeURIComponent(shortToken)}`
    );
    const longTokenData = (await longTokenRes.json()) as { access_token?: string; error?: unknown };
    const longToken = longTokenData.access_token || shortToken;

    const pagesRes = await fetch(
      `https://graph.facebook.com/v25.0/me/accounts?access_token=${encodeURIComponent(longToken)}`
    );
    const pagesData = (await pagesRes.json()) as {
      data?: { id: string; name: string; access_token: string }[];
      error?: { message?: string };
    };

    if (pagesData.error) {
      console.error("me/accounts hatası:", pagesData.error);
      const m = pagesData.error.message || "unknown";
      return fail(`pages_failed:${m.slice(0, 120)}`);
    }

    const pages = pagesData.data || [];

    const user = await prisma.user.findUnique({ where: { id: stateData.userId } });
    if (!user) return fail("user_not_found");

    let whatsappLines = 0;

    for (const page of pages) {
      const pageToken = page.access_token;

      try {
        const igWaRes = await fetch(
          `https://graph.facebook.com/v25.0/${page.id}?fields=instagram_business_account,whatsapp_business_account&access_token=${encodeURIComponent(pageToken)}`
        );
        const igWaData = (await igWaRes.json()) as {
          instagram_business_account?: { id: string };
          whatsapp_business_account?: { id: string };
          error?: { message?: string };
        };

        if (igWaData.error) {
          console.warn(`Sayfa ${page.id} fields hatası:`, igWaData.error);
        }

        if (igWaData.instagram_business_account?.id) {
          const igId = igWaData.instagram_business_account.id;
          const igProfileRes = await fetch(
            `https://graph.facebook.com/v25.0/${igId}?fields=id,username,name&access_token=${encodeURIComponent(pageToken)}`
          );
          const igProfile = (await igProfileRes.json()) as { id: string; username?: string; name?: string };
          await prisma.integration.upsert({
            where: {
              userId_platform_accountId: {
                userId: user.id,
                platform: "instagram",
                accountId: igId,
              },
            },
            create: {
              userId: user.id,
              platform: "instagram",
              accountId: igId,
              accountName: igProfile.username || igProfile.name || "Instagram",
              accessToken: pageToken,
              metadata: JSON.stringify({ linkedPageId: page.id, source: "meta_oauth" }),
            },
            update: {
              accountName: igProfile.username || igProfile.name || "Instagram",
              accessToken: pageToken,
              isActive: true,
              metadata: JSON.stringify({ linkedPageId: page.id, source: "meta_oauth" }),
            },
          });
        }

        await prisma.integration.upsert({
          where: {
            userId_platform_accountId: {
              userId: user.id,
              platform: "facebook",
              accountId: page.id,
            },
          },
          create: {
            userId: user.id,
            platform: "facebook",
            accountId: page.id,
            accountName: page.name,
            accessToken: pageToken,
            metadata: JSON.stringify({ longToken, source: "meta_oauth" }),
          },
          update: {
            accountName: page.name,
            accessToken: pageToken,
            isActive: true,
            metadata: JSON.stringify({ longToken, source: "meta_oauth" }),
          },
        });

        const wabaId = igWaData.whatsapp_business_account?.id;
        if (!wabaId) {
          continue;
        }

        const phonesRes = await fetch(
          `https://graph.facebook.com/v25.0/${wabaId}/phone_numbers?access_token=${encodeURIComponent(pageToken)}`
        );
        const phonesData = (await phonesRes.json()) as {
          data?: {
            id: string;
            display_phone_number?: string;
            verified_name?: string;
          }[];
          error?: { message?: string; code?: number };
        };

        if (phonesData.error) {
          console.warn(`WABA ${wabaId} phone_numbers hatası:`, phonesData.error);
          continue;
        }

        for (const ph of phonesData.data || []) {
          whatsappLines += 1;
          await prisma.integration.upsert({
            where: {
              userId_platform_accountId: {
                userId: user.id,
                platform: "whatsapp",
                accountId: ph.id,
              },
            },
            create: {
              userId: user.id,
              platform: "whatsapp",
              accountId: ph.id,
              accountName: ph.verified_name || ph.display_phone_number || "WhatsApp",
              accessToken: pageToken,
              metadata: JSON.stringify({
                wabaId,
                displayPhone: ph.display_phone_number,
                linkedPageId: page.id,
                source: "meta_oauth",
              }),
            },
            update: {
              accountName: ph.verified_name || ph.display_phone_number || "WhatsApp",
              accessToken: pageToken,
              isActive: true,
              metadata: JSON.stringify({
                wabaId,
                displayPhone: ph.display_phone_number,
                linkedPageId: page.id,
                source: "meta_oauth",
              }),
            },
          });
        }
      } catch (e) {
        console.warn("Sayfa işlenemedi", page.id, e);
      }
    }

    const q = new URLSearchParams({
      connected: "1",
      platform: stateData.platform,
      pages: String(pages.length),
      whatsapp: String(whatsappLines),
    });
    return NextResponse.redirect(`${origin}/dashboard/mesajlar?${q.toString()}`);
  } catch (err) {
    console.error("OAuth callback hatası:", err);
    return fail("server_error");
  }
}
