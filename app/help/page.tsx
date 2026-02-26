import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      articles: [
        "How to create an account",
        "Setting up your profile",
        "Choosing your account type",
        "Verification process"
      ]
    },
    {
      title: "For Freelancers",
      icon: "💼",
      articles: [
        "Finding projects",
        "Submitting proposals",
        "Managing your portfolio",
        "Payment and invoicing"
      ]
    },
    {
      title: "For Employers",
      icon: "🏢",
      articles: [
        "Posting a job",
        "Finding talent",
        "Managing your team",
        "Company verification"
      ]
    },
    {
      title: "Account & Security",
      icon: "🔒",
      articles: [
        "Two-factor authentication",
        "Password reset",
        "Privacy settings",
        "Account deletion"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions and learn how to get the most out of HireNUp.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full max-w-2xl mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article, j) => (
                  <li key={j}>
                    <Link href="#" className="text-primary-600 hover:underline">
                      {article}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Our support team is here to assist you.</p>
          <Link
            href="/contact"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
          >
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  )
}

