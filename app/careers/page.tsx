import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    }
  ]

  const benefits = [
    { icon: "🌍", title: "Remote First", desc: "Work from anywhere in the world" },
    { icon: "💰", title: "Competitive Salary", desc: "Top-tier compensation packages" },
    { icon: "🏥", title: "Health Benefits", desc: "Comprehensive health coverage" },
    { icon: "📚", title: "Learning Budget", desc: "Annual budget for courses and books" },
    { icon: "🏖️", title: "Flexible PTO", desc: "Take time off when you need it" },
    { icon: "💻", title: "Equipment", desc: "Latest tools and hardware provided" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us build the future of work. We&apos;re looking for passionate people to join our mission.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why HireNUp?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-gray-500">{job.department}</span>
                    <span className="text-sm text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{job.location}</span>
                    <span className="text-sm text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{job.type}</span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition text-center"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

