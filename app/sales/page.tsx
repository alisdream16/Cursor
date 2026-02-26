import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function SalesPage() {
  const benefits = [
    {
      title: "Enterprise Solutions",
      desc: "Custom packages for large organizations with dedicated support",
      icon: "🏢"
    },
    {
      title: "Volume Discounts",
      desc: "Save more when you hire multiple freelancers or post multiple projects",
      icon: "💰"
    },
    {
      title: "Dedicated Account Manager",
      desc: "Get personalized assistance from our enterprise team",
      icon: "👤"
    },
    {
      title: "Custom Integrations",
      desc: "Connect HireNUp with your existing tools and workflows",
      icon: "🔗"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Sales</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored solutions for businesses of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Request a Demo</h2>
          <form className="max-w-lg mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition"
            >
              Request Demo
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

