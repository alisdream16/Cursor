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
    description: "For small teams",
    features: [
      "1 integration",
      "2 employees",
      "Basic reporting",
      "Email support"
    ],
    forCompany: true
  },
  {
    id: "gold",
    name: "Gold",
    icon: <Crown className="w-8 h-8 text-yellow-500" />,
    monthlyPrice: 99,
    yearlyPrice: 950,
    description: "For growing companies",
    features: [
      "3 integrations",
      "6 employees",
      "Advanced reporting",
      "Priority support",
      "Project management"
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
    description: "For large organizations",
    features: [
      "5 integrations",
      "10 employees",
      "1 free job listing",
      "Full reporting",
      "24/7 support",
      "API access"
    ],
    forCompany: true
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    monthlyPrice: 399,
    yearlyPrice: 3800,
    description: "Enterprise solutions",
    features: [
      "Unlimited integrations",
      "Unlimited employees",
      "3 free job listings",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee"
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
    description: "Getting started",
    features: [
      "15% commission based",
      "Basic profile",
      "5 applications/month",
      "Email support"
    ],
    forFreelancer: true
  },
  {
    id: "gold",
    name: "Gold",
    icon: <Crown className="w-8 h-8 text-yellow-500" />,
    monthlyPrice: 29,
    yearlyPrice: 280,
    description: "Professional freelancer",
    features: [
      "Membership fee + 5% commission",
      "Featured profile",
      "Unlimited applications",
      "Priority support",
      "Portfolio showcase"
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
    description: "Expert freelancer",
    features: [
      "GOLD + Permanent promotion",
      "VIP badge",
      "Direct invitations",
      "Analytics tools",
      "Training content"
    ],
    forFreelancer: true
  }
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  const accountType = (session?.user as any)?.accountType

  const plans = accountType === "FREELANCER" ? freelancerPlans : companyPlans
  const isFreelancer = accountType === "FREELANCER"

  const handleSubscribe = (planId: PlanType) => {
    setSelectedPlan(planId)
    alert(`${planId.toUpperCase()} plan selected. Payment integration coming soon!`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isFreelancer ? "Freelancer Subscription Plans" : "Company Subscription Plans"}
          </h1>
          <p className="text-gray-600">
            Choose the plan that fits your needs
          </p>
          
          {/* Trial Banner */}
          <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <span className="font-medium">First month ALL FEATURES FREE!</span>
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
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly <span className="text-green-600 text-xs">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className={`grid gap-6 ${plans.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border-2 p-6 relative flex flex-col h-full ${
                plan.recommended
                  ? "border-primary-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
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
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-gray-500 mt-1">
                    Billed as ${plan.yearlyPrice}/year
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
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
                {plan.monthlyPrice === 0 ? "Start Free" : "Select Plan"}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">How does the trial period work?</h3>
              <p className="text-sm text-gray-600 mt-1">
                You can use all Platinum features free for the first month. 
                After that, you can switch to any plan you prefer.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Can I cancel anytime?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Yes, you can cancel your subscription at any time. 
                Your access will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
