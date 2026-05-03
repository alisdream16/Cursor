import { NextRequest, NextResponse } from "next/server";

// Instagram Graph API - Send DM
// Requires: instagram_manage_messages permission

const IG_TOKEN = process.env.INSTAGRAM_TOKEN || "";
const IG_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || "";

export async function POST(req: NextRequest) {
  try {
    const { recipientId, message, messageType = "text" } = await req.json();

    if (!recipientId || !message) {
      return NextResponse.json({ error: "recipientId ve message zorunlu" }, { status: 400 });
    }

    if (!IG_TOKEN || !IG_ACCOUNT_ID) {
      return NextResponse.json({ error: "Instagram token veya hesap ID eksik" }, { status: 500 });
    }

    const payload = {
      recipient: { id: recipientId },
      message: messageType === "text"
        ? { text: message }
        : { attachment: { type: "image", payload: { url: message } } },
    };

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${IG_ACCOUNT_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${IG_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error?.message, details: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, messageId: result.message_id, result });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
