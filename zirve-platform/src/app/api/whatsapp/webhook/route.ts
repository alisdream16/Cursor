import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { USE_ENV_WHATSAPP_TOKEN } from "@/lib/whatsapp-env-token";

const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "zirve_webhook_secret_2026";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("✅ WhatsApp Webhook doğrulandı");
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Doğrulama başarısız" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== "messages") continue;

        const value = change.value as {
          metadata?: { phone_number_id?: string };
          messages?: { type: string; from: string; text?: { body: string }; id: string }[];
          statuses?: { status?: string; id?: string }[];
        };

        const phoneNumberId = value.metadata?.phone_number_id;
        let waToken = process.env.WHATSAPP_TOKEN || "";
        let graphPhoneId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || "";
        let userId: string | null = null;

        if (phoneNumberId) {
          const integ = await prisma.integration.findFirst({
            where: { platform: "whatsapp", accountId: phoneNumberId, isActive: true },
          });
          if (integ) {
            userId = integ.userId;
            graphPhoneId = integ.accountId || phoneNumberId;
            if (integ.accessToken && integ.accessToken !== USE_ENV_WHATSAPP_TOKEN) {
              waToken = integ.accessToken;
            }
          }
        }

        if (!userId) {
          console.warn("WhatsApp webhook: phone_number_id için entegrasyon yok, mesaj işlenmedi:", phoneNumberId);
          continue;
        }

        const owner = await prisma.user.findUnique({ where: { id: userId } });
        if (!owner) continue;

        for (const message of value.messages || []) {
          if (message.type !== "text") continue;

          const from = message.from;
          const text = message.text?.body || "";

          let contact = await prisma.contact.findFirst({ where: { phone: from, userId } });
          if (!contact) {
            contact = await prisma.contact.create({
              data: { userId, name: from, phone: from, source: "whatsapp" },
            });
          }

          let conversation = await prisma.conversation.findFirst({
            where: { externalId: from, channel: "whatsapp", userId },
          });
          if (!conversation) {
            conversation = await prisma.conversation.create({
              data: {
                userId,
                contactId: contact.id,
                channel: "whatsapp",
                externalId: from,
                lastMessage: text,
              },
            });
          } else {
            await prisma.conversation.update({
              where: { id: conversation.id },
              data: { lastMessage: text, lastAt: new Date() },
            });
          }

          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              direction: "inbound",
              content: text,
              status: "delivered",
              metadata: JSON.stringify({ whatsappId: message.id, phoneNumberId }),
            },
          });

          try {
            const recentMessages = await prisma.message.findMany({
              where: { conversationId: conversation.id },
              orderBy: { createdAt: "desc" },
              take: 10,
            });

            const history = recentMessages
              .reverse()
              .map((m) => ({
                role: m.direction === "inbound" ? "user" : "assistant",
                content: m.content,
              }));

            const aiRes = await fetch(`${APP_URL}/api/ai`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: text, channel: "whatsapp", conversationHistory: history }),
            });

            const aiData = (await aiRes.json()) as { reply?: string };
            const reply = aiData.reply;

            if (reply && waToken && graphPhoneId) {
              await sendWhatsAppMessage(graphPhoneId, waToken, from, reply);

              await prisma.message.create({
                data: {
                  conversationId: conversation.id,
                  direction: "outbound",
                  content: reply,
                  status: "sent",
                  isAiGenerated: true,
                },
              });
            }
          } catch (aiError) {
            console.error("AI yanıt hatası:", aiError);
          }
        }

        for (const status of value.statuses || []) {
          console.log(`📊 Mesaj durumu: ${status.status} — ${status.id}`);
        }
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Webhook hatası:", error);
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }
}

async function sendWhatsAppMessage(phoneNumberId: string, token: string, to: string, text: string) {
  await fetch(`https://graph.facebook.com/v25.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to.replace(/\D/g, ""),
      type: "text",
      text: { body: text },
    }),
  });
}
