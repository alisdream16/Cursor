import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function AdvertisingPage() {
  const adFormats = [
    {
      title: "Featured Listings",
      desc: "Appear at the top of search results for relevant queries",
      price: "From $50/week",
      icon: "🔝"
    },
    {
      title: "Display Banners",
      desc: "Eye-catching banners on high-traffic pages",
      price: "From $200/week",
      icon: "🖼️"
    },
    {
      title: "Sponsored Content",
      desc: "Native content that engages our audience",
      price: "From $500/post",
      icon: "📝"
    },
    {
      title: "Newsletter Sponsorship",
      desc: "Reach 50K+ subscribers directly in their inbox",
      price: "From $1,000/send",
      icon: "📧"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advertising</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach professionals and businesses on HireNUp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {adFormats.map((format, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{format.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{format.title}</h3>
                    <span className="text-primary-600 font-medium text-sm">{format.price}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{format.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Advertise with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2K+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">High</div>
              <div className="text-gray-600">Intent Audience</div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Advertising Today</h2>
          <p className="mb-6 opacity-90">Get in touch with our advertising team.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Contact Sales
          </Link>
        </div>
      </main>
    </div>
  )
}

