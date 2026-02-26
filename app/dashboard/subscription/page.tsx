"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Building2, Users } from "lucide-react"

type PlanType = "silver" | "gold" | "platinum" | "pro"

interface Plan {
  id: PlanType
  name: string
  icon: React.ReactNode
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  recommended?: boolean
  forCompany?: boolean
  forFreelancer?: boolean
}

const companyPlans: Plan[] = [
  {
    id: "silver",
    name: "Silver",
    icon: <Building2 className="w-8 h-8" />,
    monthlyPrice: 49,
    yearlyPrice: 470,
    description: "Küçük ekipler için",
    features: [
      "1 entegrasyon",
      "2 çalışan",
      "Temel raporlama",
      "Email desteği"
    ],
    forCompany: true
  },
  {
    id: "gold",
    name: "Gold",
    icon: <Crown className="w-8 h-8 text-yellow-500" />,
    monthlyPrice: 99,
    yearlyPrice: 950,
    description: "Büyüyen şirketler için",
    features: [
      "3 entegrasyon",
      "6 çalışan",
      "Gelişmiş raporlama",
      "Öncelikli destek",
      "Proje yönetimi"
    ],
    recommended: true,
    forCompany: true
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    monthlyPrice: 199,
    yearlyPrice: 1900,
    description: "Büyük organizasyonlar için",
    features: [
      "5 entegrasyon",
      "10 çalışan",
      "1 ücretsiz ilan",
      "Tam raporlama",
      "7/24 destek",
      "API erişimi"
    ],
    forCompany: true
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    monthlyPrice: 399,
    yearlyPrice: 3800,
    description: "Enterprise çözümler",
    features: [
      "Sınırsız entegrasyon",
      "Sınırsız çalışan",
      "3 ücretsiz ilan",
      "Özel destek",
      "Özel entegrasyonlar",
      "SLA garantisi"
    ],
    forCompany: true
  }
]

const freelancerPlans: Plan[] = [
  {
    id: "silver",
    name: "Silver",
    icon: <Building2 className="w-8 h-8" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Başlangıç",
    features: [
      "%15 komisyon bazlı",
      "Temel profil",
      "5 başvuru/ay",
      "Email desteği"
    ],
    forFreelancer: true
  },
  {
    id: "gold",
    name: "Gold",
    icon: <Crown className="w-8 h-8 text-yellow-500" />,
    monthlyPrice: 29,
    yearlyPrice: 280,
    description: "Profesyonel freelancer",
    features: [
      "Üyelik ücreti + %5 komisyon",
      "Öne çıkan profil",
      "Sınırsız başvuru",
      "Öncelikli destek",
      "Portfolyo vitrini"
    ],
    recommended: true,
    forFreelancer: true
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    monthlyPrice: 49,
    yearlyPrice: 470,
    description: "Uzman freelancer",
    features: [
      "GOLD + Süresiz reklam",
      "VIP rozeti",
      "Doğrudan davet",
      "Analitik araçlar",
      "Eğitim içerikleri"
    ],
    forFreelancer: true
  }
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  const accountType = (session?.user as any)?.accountType

  // Hesap tipine göre planları göster
  const plans = accountType === "FREELANCER" ? freelancerPlans : companyPlans
  const isFreelancer = accountType === "FREELANCER"

  const handleSubscribe = (planId: PlanType) => {
    setSelectedPlan(planId)
    // TODO: Ödeme entegrasyonu
    alert(`${planId.toUpperCase()} planı seçildi. Ödeme entegrasyonu yakında!`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isFreelancer ? "Freelancer Üyelik Planları" : "Şirket Üyelik Planları"}
          </h1>
          <p className="text-gray-600">
            İhtiyaçlarınıza uygun planı seçin
          </p>
          
          {/* Deneme Sürümü Banner */}
          <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <span className="text-lg">🎁</span>
            <span className="font-medium">İlk 1 ay TÜM ÖZELLİKLER ÜCRETSİZ!</span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yıllık <span className="text-green-600 text-xs">%20 tasarruf</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className={`grid gap-6 ${plans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border-2 p-6 relative ${
                plan.recommended
                  ? "border-primary-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Önerilen
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                  </span>
                  <span className="text-gray-500 ml-1">/ay</span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-gray-500 mt-1">
                    ${plan.yearlyPrice}/yıl olarak faturalanır
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full ${
                  plan.recommended
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {plan.monthlyPrice === 0 ? "Ücretsiz Başla" : "Plan Seç"}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Deneme süresi nasıl çalışıyor?</h3>
              <p className="text-sm text-gray-600 mt-1">
                İlk 1 ay boyunca tüm Platinum özellikleri ücretsiz kullanabilirsiniz. 
                Süre sonunda istediğiniz plana geçebilirsiniz.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">İstediğim zaman iptal edebilir miyim?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Evet, herhangi bir zamanda aboneliğinizi iptal edebilirsiniz. 
                Kalan süreniz boyunca erişiminiz devam eder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
