"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Search, Filter, Users, DollarSign, Clock, MapPin } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Development",
    company: "TechCorp",
    description: "We are developing a modern and scalable e-commerce platform. Experience with React, Node.js and PostgreSQL required.",
    budget: "$5,000 - $8,000",
    duration: "3-4 months",
    location: "Remote",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    applicants: 12,
    status: "Open",
    type: "Technology"
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    company: "DesignHub",
    description: "Modern and user-friendly interface design for a fintech application. Figma and prototyping experience required.",
    budget: "$2,500 - $4,000",
    duration: "1-2 months",
    location: "Hybrid - New York",
    skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    applicants: 8,
    status: "Open",
    type: "Design"
  },
  {
    id: 3,
    title: "AI Chatbot Integration",
    company: "DataFlow",
    description: "AI-powered chatbot development and integration project for customer service.",
    budget: "$7,500 - $12,000",
    duration: "2-3 months",
    location: "Remote",
    skills: ["Python", "OpenAI API", "NLP", "FastAPI"],
    applicants: 15,
    status: "Open",
    type: "AI"
  },
  {
    id: 4,
    title: "Corporate Website Redesign",
    company: "CloudScale",
    description: "Redesigning and developing the company website with modern technologies.",
    budget: "$3,000 - $5,000",
    duration: "1-2 months",
    location: "Remote",
    skills: ["Next.js", "Tailwind CSS", "SEO", "CMS"],
    applicants: 20,
    status: "Open",
    type: "Web"
  },
  {
    id: 5,
    title: "IoT Dashboard Development",
    company: "GreenEnergy",
    description: "Real-time monitoring dashboard development for renewable energy systems.",
    budget: "$6,000 - $9,000",
    duration: "2-3 months",
    location: "Hybrid - San Francisco",
    skills: ["React", "D3.js", "MQTT", "Time Series DB"],
    applicants: 6,
    status: "Open",
    type: "IoT"
  }
]

const categories = ["All", "Technology", "Design", "AI", "Web", "IoT", "Mobile"]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Discover Projects</h1>
          <p className="text-primary-100 text-lg mb-8">
            Browse and apply to projects from entrepreneurs and companies.
          </p>
          
          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">{filteredProjects.length} projects found</p>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{project.status}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{project.type}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h2>
                  <p className="text-primary-600 font-medium">{project.company}</p>
                </div>
                <Link 
                  href="/auth/signup"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Apply
                </Link>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {project.budget}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.applicants} applicants
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

