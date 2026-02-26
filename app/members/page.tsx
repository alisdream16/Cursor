import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function MembersPage() {
  const members = [
    {
      name: "Alex Johnson",
      role: "Full-Stack Developer",
      location: "San Francisco, USA",
      skills: ["React", "Node.js", "Python"],
      rating: 4.9
    },
    {
      name: "Maria Garcia",
      role: "UI/UX Designer",
      location: "Barcelona, Spain",
      skills: ["Figma", "Adobe XD", "CSS"],
      rating: 5.0
    },
    {
      name: "James Chen",
      role: "Data Scientist",
      location: "Singapore",
      skills: ["Python", "TensorFlow", "SQL"],
      rating: 4.8
    },
    {
      name: "Sarah Miller",
      role: "Content Writer",
      location: "London, UK",
      skills: ["Copywriting", "SEO", "Blogging"],
      rating: 4.9
    },
    {
      name: "David Kim",
      role: "Mobile Developer",
      location: "Seoul, Korea",
      skills: ["React Native", "Swift", "Kotlin"],
      rating: 4.7
    },
    {
      name: "Emma Wilson",
      role: "Project Manager",
      location: "Toronto, Canada",
      skills: ["Agile", "Scrum", "Jira"],
      rating: 4.9
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Member Directory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our community of talented professionals.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search members..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>All Skills</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Writing</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-turquoise-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">📍 {member.location}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {member.skills.map((skill, j) => (
                  <span key={j} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600">⭐ {member.rating}</span>
                <Link href="/freelancers" className="text-primary-600 text-sm hover:underline">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition">
            Load More Members
          </button>
        </div>
      </main>
    </div>
  )
}

