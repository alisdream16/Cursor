import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "zirve_webhook_secret_2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Doğrulama başarısız" }, { status: 403 });
}

async function saveDmMessage(
  userId: string,
  channel: "instagram" | "facebook",
  externalId: string,
  text: string | undefined
) {
  if (!text?.trim()) return;

  let contact = await prisma.contact.findFirst({ where: { userId, phone: externalId } });
  if (!contact) {
    contact = await prisma.contact.create({
      data: { userId, name: externalId, phone: externalId, source: channel },
    });
  }

  let conversation = await prisma.conversation.findFirst({
    where: { userId, channel, externalId },
  });
  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId,
        contactId: contact.id,
        channel,
        externalId,
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
      metadata: JSON.stringify({ source: channel }),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === "instagram") {
      for (const entry of body.entry || []) {
        const igBizId = entry.id as string;
        const integ = await prisma.integration.findFirst({
          where: { platform: "instagram", accountId: igBizId, isActive: true },
        });
        if (!integ) continue;

        for (const msg of entry.messaging || []) {
          const senderId = msg.sender?.id as string | undefined;
          const text = msg.message?.text as string | undefined;
          if (!senderId) continue;
          await saveDmMessage(integ.userId, "instagram", senderId, text);
        }
      }
    }

    if (body.object === "page") {
      for (const entry of body.entry || []) {
        const pageId = entry.id as string;
        const integ = await prisma.integration.findFirst({
          where: { platform: "facebook", accountId: pageId, isActive: true },
        });
        if (!integ) continue;

        for (const msg of entry.messaging || []) {
          if (msg.message?.is_echo) continue;
          const senderId = msg.sender?.id as string | undefined;
          const text = msg.message?.text as string | undefined;
          if (!senderId) continue;
          await saveDmMessage(integ.userId, "facebook", senderId, text);
        }
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }
}
