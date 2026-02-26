import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Basit AI yanıt fonksiyonu (gerçek uygulamada OpenAI API kullanılabilir)
function generateAIResponse(message: string, context?: any): string {
  const lowerMessage = message.toLowerCase()

  // Proje context'i varsa, buna göre özelleştirilmiş yanıtlar ver
  if (context) {
    const { projectName, budget, industry, type } = context

    // Proje başlangıç soruları
    if (lowerMessage.includes("ne yapmalı") || lowerMessage.includes("nereden başla") || lowerMessage.includes("ilk adım")) {
      return `"${projectName}" projeniz için harika bir başlangıç! İşte önerilerim:\n\n1. **Proje Kapsamını Netleştirin**\n   - Ana özellikler ve hedefler\n   - Başarı kriterleri\n   - Teslim tarihleri\n\n2. **Ekip İhtiyaçlarınızı Belirleyin**\n   ${industry === "Teknoloji" || industry === "technology" ? 
      "- Full-stack Developer\n   - UI/UX Designer\n   - QA Tester" : 
      "- Proje Müdürü\n   - İlgili alan uzmanları\n   - Destek ekibi"}\n\n3. **Bütçe Dağılımı**\n   ${budget ? `- Toplam bütçe: ${budget} TL\n   - Personel: %60-70\n   - Araçlar: %15-20\n   - Acil durum fonu: %15` : "- Detaylı bütçe planlaması yapın"}\n\nDaha fazla detay verebilir misiniz?`
    }

    // Bütçe soruları
    if (lowerMessage.includes("bütçe") || lowerMessage.includes("budget") || lowerMessage.includes("maliyet")) {
      if (budget) {
        const budgetNum = parseFloat(budget)
        return `${budgetNum.toLocaleString('tr-TR')} TL bütçe ile şunları yapabilirsiniz:\n\n**Önerilen Bütçe Dağılımı:**\n• Personel Maliyeti: ${(budgetNum * 0.65).toLocaleString('tr-TR')} TL (65%)\n• Araçlar ve Lisanslar: ${(budgetNum * 0.20).toLocaleString('tr-TR')} TL (20%)\n• Acil Durum Fonu: ${(budgetNum * 0.15).toLocaleString('tr-TR')} TL (15%)\n\n**Tahmini Ekip:**\n${budgetNum > 200000 ? 
          "- Senior Developer: 2 kişi\n- Mid-level Developer: 2 kişi\n- Designer: 1 kişi\n- Project Manager: 1 kişi" :
          budgetNum > 100000 ?
          "- Mid-level Developer: 2 kişi\n- Designer: 1 kişi\n- Part-time PM: 1 kişi" :
          "- Junior/Mid Developer: 1-2 kişi\n- Freelance Designer: Part-time"}\n\nDaha detaylı planlama ister misiniz?`
      }
      return "Bütçenizi belirtirseniz, size özel bir planlama yapabilirim. Projeniz için düşündüğünüz bütçe nedir?"
    }

    // Ekip soruları
    if (lowerMessage.includes("ekip") || lowerMessage.includes("team") || lowerMessage.includes("çalışan") || lowerMessage.includes("personel")) {
      return `"${projectName}" için önerilen ekip yapısı:\n\n**${type === "company" ? "Şirket" : "Startup"} Projesi İçin:**\n\n1. **Çekirdek Ekip**\n   - Proje Lideri/Müdürü\n   - ${industry === "Teknoloji" || industry?.toLowerCase().includes("tech") ? 
      "Tech Lead (Senior Developer)" : "Domain Expert (Sektör Uzmanı)"}\n   - Product Owner\n\n2. **Geliştirme Ekibi**\n   ${industry?.toLowerCase().includes("tech") || industry?.toLowerCase().includes("software") ?
      "- Frontend Developer (2)\n   - Backend Developer (2)\n   - DevOps Engineer (1)" :
      "- İş Analisti (1)\n   - Operasyon Uzmanı (1-2)\n   - Destek Ekibi (1-2)"}\n\n3. **Destek Rolleri**\n   - UI/UX Designer\n   - QA/Test Uzmanı\n   - Marketing Specialist (isteğe bağlı)\n\n${budget ? `Bütçeniz (${budget} TL) bu ekibi destekleyebilir.` : ""}\n\nHangi rolleri önceliklendirmemi istersiniz?`
    }

    // Timeline soruları
    if (lowerMessage.includes("süre") || lowerMessage.includes("zaman") || lowerMessage.includes("ne kadar") || lowerMessage.includes("timeline")) {
      return `"${projectName}" için tahmini timeline:\n\n**Faz 1: Planlama (2-3 hafta)**\n- Gereksinim analizi\n- Ekip kurulumu\n- Teknoloji seçimi\n\n**Faz 2: Geliştirme (${budget && parseFloat(budget) > 150000 ? "2-4 ay" : "1-3 ay"})**\n- MVP geliştirme\n- İteratif iyileştirmeler\n- Test ve debugging\n\n**Faz 3: Lansман (2-4 hafta)**\n- Beta testleri\n- İyileştirmeler\n- Resmi lansman\n\n${budget ? `Bütçeniz (${budget} TL) ${parseFloat(budget) > 150000 ? "orta-büyük" : "küçük-orta"} ölçekli bir proje için yeterli.` : ""}\n\nDaha detaylı bir roadmap çıkarayım mı?`
    }
  }

  // Genel sorular (context olmadan)
  if (lowerMessage.includes("freelancer") || lowerMessage.includes("developer")) {
    return "Size mükemmel freelancer bulma konusunda yardımcı olabilirim:\n\n• Portfolyolarını ve geçmiş işlerini inceleyin\n• Önceki müşteri yorumlarını okuyun\n• Becerilerini ve sertifikalarını doğrulayın\n• Küçük bir test projesi ile başlayın\n• Beklentileri net şekilde belirtin\n\nBelirli becerilere göre freelancer önermemi ister misiniz?"
  }

  if (lowerMessage.includes("team") || lowerMessage.includes("startup") || lowerMessage.includes("ekip")) {
    return "Harika bir ekip kurmak çok önemli! İhtiyacınız olanlar:\n\n• Net roller ve sorumluluklar tanımlayın\n• Tamamlayıcı becerilere sahip kişiler bulun\n• Kültürel uyumu gözetin\n• Çekirdek ekip üyeleri ile başlayın\n• Ölçeklenebilirlik için planlayın\n\nProjeniz hakkında daha fazla bilgi verirseniz, ihtiyacınız olan rolleri belirleyebilirim!"
  }

  if (lowerMessage.includes("verify") || lowerMessage.includes("kyc") || lowerMessage.includes("doğrulama")) {
    return "Hesap doğrulama (KYC) güven oluşturur! İşte nasıl:\n\n1. Dashboard → KYC Doğrulama\n2. Kimlik belgenizi yükleyin\n3. Selfie çekin (yüz tanıma için)\n4. Onay bekleyin (genellikle 24-48 saat)\n\nDoğrulanmış hesaplar:\n• Güven rozeti alır\n• Daha fazla görünürlük\n• Premium özelliklere erişim\n• Daha iyi proje fırsatları"
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget") || lowerMessage.includes("fiyat") || lowerMessage.includes("ücret")) {
    return "Fiyatlandırma birkaç faktöre bağlı:\n\n• Proje karmaşıklığı\n• Timeline gereksinimleri\n• Freelancer deneyim seviyesi\n• Beceriler için piyasa oranları\n\nGenel aralıklar:\n• Junior: 500-1000 TL/gün\n• Mid-level: 1000-2000 TL/gün\n• Senior: 2000-4000 TL/gün\n• Expert: 4000+ TL/gün\n\nSabit fiyatlı projeler de yaygındır. Ne tür bir iş yapmanız gerekiyor?"
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("merhaba") || lowerMessage.includes("selam")) {
    return "Merhaba! Sizinle konuşmak harika! 👋\n\nSize şunlarda yardımcı olabilirim:\n• Freelancer bulma\n• Ekip kurma\n• Platform rehberliği\n• Proje tavsiyeleri\n• Kariyer önerileri\n\nNe öğrenmek istersiniz?"
  }

  // Default response
  return `"${message}" hakkında sorduğunuzu anlıyorum.\n\nSize şu konularda yardımcı olabilirim:\n• Freelancer bulma ve işe alma\n• Proje ekipleri oluşturma\n• Platform özellikleri ve doğrulama\n• Fiyatlandırma ve bütçeleme\n• Proje yönetimi önerileri\n\nİhtiyacınız olan konuda daha fazla detay verebilir misiniz?`
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { message, context } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Generate AI response with context
    const response = generateAIResponse(message, context)

    // In production, you would call OpenAI API here:
    /*
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant for HireNUp platform that helps users find freelancers, build teams, and manage projects." 
        },
        { role: "user", content: message }
      ],
    })
    const response = completion.choices[0].message.content
    */

    return NextResponse.json(
      { 
        response,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

