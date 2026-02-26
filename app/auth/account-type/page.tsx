"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"

// MVP: Sadece 3 hesap tipi aktif
type AccountType = "freelancer" | "worker" | "employer"

const accountTypes = [
  {
    type: "employer" as AccountType,
    title: "Şirket",
    icon: "🏢",
    description: "Şirketinizi yönetin, çalışanları koordine edin, projeleri takip edin",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    features: [
      "Şirket profili oluşturun",
      "Çalışanları yönetin",
      "Projeleri takip edin",
      "Freelancer'larla çalışın",
      "Entegrasyonları kullanın"
    ],
  },
  {
    type: "freelancer" as AccountType,
    title: "Freelancer",
    icon: "💼",
    description: "Bağımsız çalışın, projeler alın, yeteneklerinizi sergileyin",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    features: [
      "Profil ve portfolyo",
      "İş ilanlarına başvurun",
      "Projeler alın",
      "Değerlendirmeler kazanın",
      "Komisyon bazlı gelir"
    ],
  },
  {
    type: "worker" as AccountType,
    title: "Şirket Çalışanı",
    icon: "👷",
    description: "Şirketinize bağlı çalışın, görevleri tamamlayın, raporlar oluşturun",
    color: "bg-green-50 border-green-200 text-green-700",
    features: [
      "Görevleri görüntüleyin",
      "Raporlar oluşturun",
      "İzinleri yönetin",
      "Proje takibi",
      "Entegrasyon erişimi"
    ],
  },
]

export default function AccountTypePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<AccountType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated" && session?.user) {
      const accountType = (session.user as any).accountType
      if (accountType) {
        router.push("/dashboard")
      }
    }
  }, [status, router, session])

  const handleSubmit = async () => {
    if (!selectedType) return

    setLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/auth/set-account-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType: selectedType }),
      })

      if (response.ok) {
        window.location.href = "/dashboard"
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.error || "Hesap tipi ayarlanamadı. Lütfen tekrar deneyin.")
        setLoading(false)
      }
    } catch (err) {
      console.error("Error setting account type:", err)
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hesap Türünüzü Seçin
          </h1>
          <p className="text-xl text-gray-600">
            HireNUp'ta nasıl yer almak istediğinizi seçin.
          </p>
          <p className="text-sm text-green-600 mt-2 font-medium">
            🎁 İlk 1 ay tüm özellikler ÜCRETSİZ!
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {accountTypes.map((account) => (
            <button
              key={account.type}
              onClick={() => setSelectedType(account.type)}
              disabled={loading}
              className={`bg-white rounded-lg p-6 border-2 transition-all text-left ${
                selectedType === account.type
                  ? "border-primary-500 ring-4 ring-primary-100 shadow-lg transform scale-105"
                  : `border-gray-200 hover:border-primary-300 hover:shadow-md`
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="text-5xl mb-4 text-center">{account.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">{account.title}</h3>
              <p className="text-gray-600 mb-4 text-center text-sm">{account.description}</p>
              <ul className="space-y-2">
                {account.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-primary-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedType || loading}
            size="lg"
            className="bg-primary-500 hover:bg-primary-600 text-white px-12"
          >
            {loading ? "Kaydediliyor..." : "Devam Et"}
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Daha sonra hesap türünüzü değiştirebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
