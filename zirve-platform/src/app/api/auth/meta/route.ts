// Meta OAuth — tarayıcı çerezindeki ZIRVE kullanıcısı için başlatır
// redirect_uri her zaman bu isteğin geldiği origin ile aynı olmalı (localhost vs 127.0.0.1 uyumu).

import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";

const APP_ID = process.env.META_APP_ID!;

const SCOPES = [
  "pages_show_list",
  "pages_messaging",
  "pages_manage_metadata",
  "pages_read_engagement",
  "instagram_basic",
  "instagram_manage_messages",
  "instagram_manage_comments",
  "instagram_content_publish",
  "whatsapp_business_management",
  "whatsapp_business_messaging",
  "business_management",
].join(",");

export async function GET(req: NextRequest) {
  if (!APP_ID) {
    return NextResponse.json({ error: "META_APP_ID tanımlı değil" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  const userId = getSessionUserId(req);
  if (!userId) {
    const platformEnc = encodeURIComponent(req.nextUrl.searchParams.get("platform") || "all");
    return NextResponse.redirect(`${origin}/dashboard/baglanti?next=meta&platform=${platformEnc}`);
  }

  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform") || "all";

  const state = Buffer.from(JSON.stringify({ platform, userId, ts: Date.now() })).toString("base64");
  const callbackUrl = `${origin}/api/auth/meta/callback`;

  const authUrl = new URL("https://www.facebook.com/v25.0/dialog/oauth");
  authUrl.searchParams.set("client_id", APP_ID);
  authUrl.searchParams.set("redirect_uri", callbackUrl);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("response_type", "code");

  return NextResponse.redirect(authUrl.toString());
}
