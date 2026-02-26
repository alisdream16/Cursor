import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function DevelopersPage() {
  const apiFeatures = [
    {
      title: "User API",
      desc: "Access user profiles, skills, and availability",
      icon: "👤"
    },
    {
      title: "Projects API",
      desc: "Create and manage projects programmatically",
      icon: "📁"
    },
    {
      title: "Search API",
      desc: "Search for freelancers, companies, and jobs",
      icon: "🔍"
    },
    {
      title: "Webhooks",
      desc: "Real-time notifications for events",
      icon: "🔔"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Developers</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build powerful integrations with the HireNUp API.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-6">
              Our RESTful API makes it easy to integrate HireNUp into your applications.
              Get started in minutes with our comprehensive documentation.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              <code>
                curl -X GET &quot;https://api.hirenup.com/v1/users&quot; \<br />
                &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_API_KEY&quot;
              </code>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-6">
              Secure your API requests using OAuth 2.0 or API keys. All requests must be authenticated.
            </p>
            <Link
              href="#"
              className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
            >
              Get API Key
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">API Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiFeatures.map((feature, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to build?</h2>
          <p className="mb-6 opacity-90">Check out our documentation and start integrating today.</p>
          <Link
            href="#"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            View Documentation
          </Link>
        </div>
      </main>
    </div>
  )
}

