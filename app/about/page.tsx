"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Zap, Globe, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Profesyonelleri Birleştiren Platform
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            HireNUp, freelancer'lar, şirketler ve çalışanların bir araya geldiği, 
            iş birliği yaptığı ve birlikte büyüdüğü yenilikçi bir platformdur.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misyonumuz</h2>
            <p className="text-gray-600 text-lg mb-4">
              İş dünyasında bağlantı kurmanın ve iş birliği yapmanın en kolay yolunu sunmak. 
              Yetenekli profesyonelleri doğru fırsatlarla buluşturarak herkesin potansiyelini 
              gerçekleştirmesine yardımcı oluyoruz.
            </p>
            <p className="text-gray-600 text-lg">
              Upwork, LinkedIn, Fiverr ve Odoo'nun en iyi özelliklerini tek bir platformda 
              birleştirerek, iş yapma şeklinizi dönüştürüyoruz.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">10K+</div>
                <div className="text-gray-600">Aktif Kullanıcı</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">5K+</div>
                <div className="text-gray-600">Tamamlanan Proje</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">2K+</div>
                <div className="text-gray-600">Şirket</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">98%</div>
                <div className="text-gray-600">Memnuniyet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Topluluk Öncelikli",
                desc: "Her kararımızda kullanıcılarımızın ihtiyaçlarını ön planda tutuyoruz."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Şeffaflık",
                desc: "Açık ve dürüst iletişim ile güven inşa ediyoruz."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Yenilikçilik",
                desc: "Sürekli gelişim ve yeni çözümler sunmak için çalışıyoruz."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Küresel Bakış",
                desc: "Dünyanın her yerinden yetenekleri bir araya getiriyoruz."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Kalite",
                desc: "En yüksek standartlarda hizmet sunmayı hedefliyoruz."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Tutku",
                desc: "İşimizi seviyoruz ve bu tutku her şeye yansıyor."
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Hemen Başlayın</h2>
          <p className="text-primary-100 text-lg mb-8">
            Binlerce profesyonelin arasına katılın ve fırsatları keşfedin.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
