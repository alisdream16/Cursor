import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function PressPage() {
  const pressReleases = [
    {
      date: "November 2024",
      title: "HireNUp Launches New AI-Powered Team Matching",
      excerpt: "Revolutionary AI technology helps companies find the perfect team members faster than ever."
    },
    {
      date: "October 2024",
      title: "HireNUp Reaches 10,000 Active Users Milestone",
      excerpt: "Platform celebrates rapid growth with enhanced features for freelancers and employers."
    },
    {
      date: "September 2024",
      title: "HireNUp Expands to European Markets",
      excerpt: "New localization features and payment options for EU-based users."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Press & Media</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Latest news, press releases, and media resources from HireNUp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <span className="text-sm text-gray-500">{release.date}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{release.title}</h3>
                  <p className="text-gray-600">{release.excerpt}</p>
                  <Link href="#" className="text-primary-600 hover:underline mt-4 inline-block">
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Contact</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">
                For press inquiries, please contact our media relations team.
              </p>
              <p className="text-gray-900 font-medium">press@hirenup.com</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Brand Assets</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">
                Download our logo, brand guidelines, and other media assets.
              </p>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
                Download Press Kit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

