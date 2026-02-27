"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Book, HelpCircle } from "lucide-react"

const faqs = [
  {
    category: "Genel",
    questions: [
      {
        q: "HireNUp nedir?",
        a: "HireNUp, freelancer'lar, şirketler ve çalışanları bir araya getiren kapsamlı bir iş platformudur. Proje yönetimi, iş ilanları, freelancer bulma ve ekip yönetimi gibi birçok özellik sunar."
      },
      {
        q: "Hesap oluşturmak ücretsiz mi?",
        a: "Evet, HireNUp'a kaydolmak tamamen ücretsizdir. İlk 1 ay tüm premium özellikleri ücretsiz kullanabilirsiniz."
      },
      {
        q: "Hangi hesap türlerini sunuyorsunuz?",
        a: "Şu anda Freelancer, Şirket ve Şirket Çalışanı olmak üzere 3 farklı hesap türü sunuyoruz. Girişimci ve Yatırımcı hesapları yakında aktif olacak."
      }
    ]
  },
  {
    category: "Freelancer'lar İçin",
    questions: [
      {
        q: "Freelancer olarak nasıl iş bulabilirim?",
        a: "Profilinizi oluşturduktan sonra 'İş İlanları' bölümünden size uygun işlere başvurabilir veya 'Find Talent' sayfasında şirketler tarafından keşfedilmeyi bekleyebilirsiniz."
      },
      {
        q: "Komisyon oranları nedir?",
        a: "Silver (ücretsiz) planda %15, Gold planda %5, Platinum planda ise %0 komisyon uygulanmaktadır."
      }
    ]
  },
  {
    category: "Şirketler İçin",
    questions: [
      {
        q: "Nasıl iş ilanı verebilirim?",
        a: "Dashboard'unuzdan 'İş İlanları' bölümüne giderek yeni ilan oluşturabilirsiniz. İlanınız onaylandıktan sonra freelancer'lar başvuru yapabilir."
      },
      {
        q: "Çalışanlarımı platforma nasıl eklerim?",
        a: "Dashboard'da 'Çalışanlar' bölümünden davet gönderebilirsiniz. Çalışanlarınız daveti kabul ettiğinde otomatik olarak şirketinize bağlanır."
      }
    ]
  },
  {
    category: "Ödeme",
    questions: [
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Kredi/banka kartı, havale/EFT ve PayPal ile ödeme yapabilirsiniz."
      },
      {
        q: "Aboneliğimi iptal edebilir miyim?",
        a: "Evet, istediğiniz zaman aboneliğinizi iptal edebilirsiniz. Kalan süreniz boyunca erişiminiz devam eder."
      }
    ]
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Yardım Merkezi</h1>
          <p className="text-primary-100 mb-8">Nasıl yardımcı olabiliriz?</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Soru veya konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Book className="w-6 h-6" />, title: "Başlangıç Rehberi", link: "#" },
            { icon: <HelpCircle className="w-6 h-6" />, title: "SSS", link: "#faq" },
            { icon: <MessageCircle className="w-6 h-6" />, title: "Canlı Destek", link: "#" },
            { icon: <Mail className="w-6 h-6" />, title: "E-posta Gönder", link: "mailto:support@hirenup.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-3">
                {item.icon}
              </div>
              <div className="font-medium text-gray-900">{item.title}</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sıkça Sorulan Sorular</h2>
          
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`
                  const isOpen = openItems.includes(itemId)
                  return (
                    <div key={qIndex} className="bg-white rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-600">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-primary-50 rounded-xl p-8 text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Hala yardıma mı ihtiyacınız var?</h3>
          <p className="text-gray-600 mb-4">Destek ekibimiz size yardımcı olmak için hazır.</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@hirenup.com" className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
              <Mail className="w-4 h-4" />
              E-posta Gönder
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg border border-primary-200 hover:bg-primary-50 transition">
              <MessageCircle className="w-4 h-4" />
              Canlı Destek
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
