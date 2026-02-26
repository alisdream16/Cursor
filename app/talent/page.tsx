import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function TalentPage() {
  const features = [
    {
      title: "AI-Powered Matching",
      desc: "Our smart algorithm finds the perfect candidates for your projects",
      icon: "🤖"
    },
    {
      title: "Verified Professionals",
      desc: "All freelancers go through our verification process",
      icon: "✅"
    },
    {
      title: "Skill Assessments",
      desc: "View test scores and certifications",
      icon: "📝"
    },
    {
      title: "Portfolio Review",
      desc: "Browse past work and client reviews",
      icon: "🎨"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Top Talent</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access a global pool of skilled professionals ready to bring your projects to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-lg p-8 text-center text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">Ready to hire?</h2>
          <p className="mb-6 opacity-90">Post your project and receive proposals from qualified freelancers within hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/freelancers"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Browse Talent
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition font-medium"
            >
              Post a Project
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Trusted by companies worldwide</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-2xl">
            <span>🏢 TechCorp</span>
            <span>🏢 StartupXYZ</span>
            <span>🏢 GlobalInc</span>
            <span>🏢 InnovateCo</span>
          </div>
        </div>
      </main>
    </div>
  )
}

