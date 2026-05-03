import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { USE_ENV_WHATSAPP_TOKEN } from "@/lib/whatsapp-env-token";

// WhatsApp Cloud API - Send Message
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/messages
const API_VERSION = "v25.0";

export interface SendMessageRequest {
  to: string;           // Recipient phone number with country code (e.g. 905321234567)
  type: "text" | "template" | "image" | "document" | "audio" | "video" | "interactive";
  text?: string;
  templateName?: string;
  templateLanguage?: string;
  templateComponents?: object[];
  mediaUrl?: string;
  caption?: string;
  interactive?: object;
  /** Veritabanındaki whatsapp Integration kaydı — yoksa .env kullanılır */
  integrationId?: string;
}

async function resolveSendCredentials(integrationId?: string) {
  const envToken = process.env.WHATSAPP_TOKEN || "";
  const envPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";

  if (!integrationId) {
    return { token: envToken, phoneNumberId: envPhoneId };
  }

  const row = await prisma.integration.findUnique({ where: { id: integrationId } });
  if (!row || row.platform !== "whatsapp") {
    return { token: envToken, phoneNumberId: envPhoneId };
  }

  const useEnv = !row.accessToken || row.accessToken === USE_ENV_WHATSAPP_TOKEN;
  const token = useEnv ? envToken : row.accessToken;
  const phoneNumberId = row.accountId || envPhoneId;
  return { token, phoneNumberId };
}

export async function POST(req: NextRequest) {
  try {
    const body: SendMessageRequest = await req.json();
    const {
      to,
      type,
      text,
      templateName,
      templateLanguage,
      templateComponents,
      mediaUrl,
      caption,
      interactive,
      integrationId,
    } = body;

    if (!to) {
      return NextResponse.json({ error: "Alıcı telefon numarası zorunlu" }, { status: 400 });
    }

    const { token: WA_TOKEN, phoneNumberId: PHONE_NUMBER_ID } = await resolveSendCredentials(integrationId);

    if (!WA_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json(
        {
          error:
            "WhatsApp token veya Phone Number ID yok. .env (WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID) veya hesap kaydında token/ID ekleyin.",
        },
        { status: 500 }
      );
    }

    // Build message payload
    let messagePayload: Record<string, unknown> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to.replace(/\D/g, ""), // Strip non-digits
    };

    switch (type) {
      case "text":
        messagePayload = {
          ...messagePayload,
          type: "text",
          text: { preview_url: false, body: text },
        };
        break;

      case "template":
        messagePayload = {
          ...messagePayload,
          type: "template",
          template: {
            name: templateName,
            language: { code: templateLanguage || "tr" },
            components: templateComponents || [],
          },
        };
        break;

      case "image":
        messagePayload = {
          ...messagePayload,
          type: "image",
          image: { link: mediaUrl, caption: caption || "" },
        };
        break;

      case "interactive":
        messagePayload = {
          ...messagePayload,
          type: "interactive",
          interactive,
        };
        break;

      default:
        return NextResponse.json({ error: `Desteklenmeyen mesaj tipi: ${type}` }, { status: 400 });
    }

    // Send via WhatsApp Cloud API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WA_TOKEN}`,
        },
        body: JSON.stringify(messagePayload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", result);
      return NextResponse.json(
        {
          error: result.error?.message || "WhatsApp API hatası",
          code: result.error?.code,
          details: result,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messages?.[0]?.id,
      to: result.contacts?.[0]?.wa_id,
      result,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
