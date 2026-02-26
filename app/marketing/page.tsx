import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function MarketingPage() {
  const solutions = [
    {
      title: "Sponsored Listings",
      desc: "Get your profile or project featured at the top of search results",
      icon: "⭐"
    },
    {
      title: "Banner Ads",
      desc: "Display your brand across the HireNUp platform",
      icon: "🖼️"
    },
    {
      title: "Email Campaigns",
      desc: "Reach our community through targeted email marketing",
      icon: "📧"
    },
    {
      title: "Content Partnerships",
      desc: "Collaborate on blog posts, webinars, and more",
      icon: "🤝"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketing Solutions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Promote your business to our community of professionals and companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {solutions.map((solution, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{solution.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Monthly Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Email Subscribers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
              <div className="text-gray-600">Engagement Rate</div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="mb-6 opacity-90">Contact our marketing team to discuss your goals.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Contact Us
          </Link>
        </div>
      </main>
    </div>
  )
}

