import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function LearningPage() {
  const courses = [
    {
      title: "Freelancing 101",
      desc: "Learn the fundamentals of starting your freelance career",
      duration: "2 hours",
      level: "Beginner",
      icon: "📚"
    },
    {
      title: "Building Your Portfolio",
      desc: "Create a portfolio that attracts clients",
      duration: "1.5 hours",
      level: "Beginner",
      icon: "🎨"
    },
    {
      title: "Client Communication",
      desc: "Master the art of professional communication",
      duration: "1 hour",
      level: "Intermediate",
      icon: "💬"
    },
    {
      title: "Pricing Your Services",
      desc: "Learn how to value and price your work",
      duration: "1 hour",
      level: "Intermediate",
      icon: "💰"
    },
    {
      title: "Project Management",
      desc: "Deliver projects on time and within scope",
      duration: "2.5 hours",
      level: "Advanced",
      icon: "📋"
    },
    {
      title: "Scaling Your Business",
      desc: "Grow from freelancer to agency owner",
      duration: "3 hours",
      level: "Advanced",
      icon: "🚀"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free courses and resources to help you succeed on HireNUp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="h-32 bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center">
                <span className="text-5xl">{course.icon}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">{course.level}</span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.desc}</p>
                <Link
                  href="#"
                  className="text-primary-600 hover:underline text-sm font-medium"
                >
                  Start Learning →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

