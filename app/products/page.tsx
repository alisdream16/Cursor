import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function ProductsPage() {
  const products = [
    {
      title: "HireNUp Free",
      price: "Free",
      desc: "Perfect for getting started",
      features: [
        "Create your profile",
        "Apply to 5 projects/month",
        "Basic search filters",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      title: "HireNUp Pro",
      price: "$19/month",
      desc: "For serious freelancers",
      features: [
        "Unlimited project applications",
        "Priority in search results",
        "Advanced analytics",
        "Featured profile badge",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      title: "HireNUp Business",
      price: "$99/month",
      desc: "For teams and companies",
      features: [
        "Everything in Pro",
        "Team management",
        "Bulk hiring tools",
        "Custom branding",
        "API access",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Products & Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-8 shadow-sm border-2 ${
                product.highlighted
                  ? "border-primary-500 relative"
                  : "border-gray-200"
              }`}
            >
              {product.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">{product.price}</div>
              <p className="text-gray-600 mb-6">{product.desc}</p>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className={`block text-center py-3 rounded-lg transition ${
                  product.highlighted
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {product.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

