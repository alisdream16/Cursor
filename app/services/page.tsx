import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      desc: "Custom websites, web apps, and e-commerce solutions",
      icon: "🌐",
      count: "2,500+ freelancers"
    },
    {
      title: "Mobile Development",
      desc: "iOS, Android, and cross-platform mobile apps",
      icon: "📱",
      count: "1,800+ freelancers"
    },
    {
      title: "UI/UX Design",
      desc: "User interface and experience design",
      icon: "🎨",
      count: "1,500+ freelancers"
    },
    {
      title: "Digital Marketing",
      desc: "SEO, social media, and content marketing",
      icon: "📈",
      count: "1,200+ freelancers"
    },
    {
      title: "Content Writing",
      desc: "Blog posts, copywriting, and technical writing",
      icon: "✍️",
      count: "2,000+ freelancers"
    },
    {
      title: "Video Production",
      desc: "Video editing, animation, and motion graphics",
      icon: "🎬",
      count: "800+ freelancers"
    },
    {
      title: "Data Science",
      desc: "Data analysis, machine learning, and AI",
      icon: "📊",
      count: "600+ freelancers"
    },
    {
      title: "Virtual Assistance",
      desc: "Administrative support and project management",
      icon: "💼",
      count: "1,000+ freelancers"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find skilled professionals for any type of project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Link key={i} href="/freelancers" className="group">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition h-full">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                <span className="text-xs text-primary-600">{service.count}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can&apos;t find what you need?</h2>
          <p className="text-gray-600 mb-6">Post a project and let freelancers come to you.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
          >
            Post a Project
          </Link>
        </div>
      </main>
    </div>
  )
}

