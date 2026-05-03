import { NextRequest, NextResponse } from "next/server";

// AI Ajan - Gelen mesajlara otomatik yanıt üretir
// WhatsApp, Instagram DM ve Facebook mesajlarında kullanılır

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// İşletme bilgileri - her kullanıcı için özelleştirilebilir
const DEFAULT_SYSTEM_PROMPT = `Sen ZİRVE platformunu kullanan bir işletmenin müşteri hizmetleri asistanısın.

GÖREVLERIN:
1. Müşteri sorularını kibarca ve profesyonelce yanıtla
2. Fiyat sorusu gelirse randevu veya demo talep et
3. Şikayet varsa empati kur, çözüm sun
4. Randevu talebini al: isim, telefon, uygun saat

YANIT KURALLARI:
- Kısa ve net yanıtlar ver (maksimum 3 cümle)
- Türkçe konuş
- Emoji kullan ama abartma
- "Bilmiyorum" deme, "size özel bilgi alayım" de
- Her yanıtta bir sonraki adımı öner`;

export async function POST(req: NextRequest) {
  try {
    const {
      message,
      channel,        // whatsapp | instagram | facebook
      conversationHistory = [],
      businessContext = {},  // İşletme özel bilgileri
      language = "tr",
    } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mesaj boş olamaz" }, { status: 400 });
    }

    // OpenAI yoksa demo yanıt döndür
    if (!OPENAI_API_KEY) {
      return NextResponse.json({
        reply: getDemoReply(message, channel),
        model: "demo",
        tokens: 0,
      });
    }

    // Geçmiş konuşmalar + yeni mesaj
    const messages = [
      {
        role: "system",
        content: businessContext.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      },
      ...conversationHistory.slice(-10), // Son 10 mesaj (token tasarrufu)
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Hızlı ve ucuz
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message }, { status: 500 });
    }

    const reply = data.choices[0]?.message?.content || "";

    return NextResponse.json({
      reply,
      model: data.model,
      tokens: data.usage?.total_tokens,
      channel,
    });
  } catch (error) {
    console.error("AI Ajan hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// OpenAI yokken demo yanıtlar
function getDemoReply(message: string, channel: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("fiyat") || msg.includes("ücret") || msg.includes("ne kadar")) {
    return "Fiyatlarımız ihtiyacınıza göre değişiyor 😊 Size özel bir teklif hazırlayabilmem için 15 dakikalık demo görüşmesi yapabilir miyiz?";
  }
  if (msg.includes("randevu") || msg.includes("görüşme") || msg.includes("toplantı")) {
    return "Tabii ki! 📅 Hangi gün ve saat size uygun? Yarın veya bu hafta içinde bir zaman ayarlayabiliriz.";
  }
  if (msg.includes("merhaba") || msg.includes("selam") || msg.includes("iyi")) {
    return "Merhaba! 👋 ZİRVE'ye hoş geldiniz. Size nasıl yardımcı olabilirim?";
  }
  if (msg.includes("teşekkür") || msg.includes("sağ ol")) {
    return "Rica ederim! 😊 Başka bir konuda yardımcı olabilir miyim?";
  }

  return "Mesajınızı aldım 👍 En kısa sürede size detaylı bilgi vereceğim. Telefon görüşmesi yapmamı ister misiniz?";
}
