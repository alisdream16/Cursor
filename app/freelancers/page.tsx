"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Search, Star, MapPin, Briefcase, CheckCircle } from "lucide-react"

const freelancers = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior Full Stack Developer",
    avatar: "JS",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "$75/hr",
    location: "New York, USA",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    completedJobs: 52,
    verified: true,
    available: true
  },
  {
    id: 2,
    name: "Emily Chen",
    title: "UI/UX Designer",
    avatar: "EC",
    rating: 5.0,
    reviews: 38,
    hourlyRate: "$65/hr",
    location: "San Francisco, USA",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    completedJobs: 41,
    verified: true,
    available: true
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Mobile App Developer",
    avatar: "MB",
    rating: 4.8,
    reviews: 29,
    hourlyRate: "$80/hr",
    location: "Austin, USA",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    completedJobs: 33,
    verified: true,
    available: false
  },
  {
    id: 4,
    name: "Sarah Wilson",
    title: "Data Scientist",
    avatar: "SW",
    rating: 4.9,
    reviews: 22,
    hourlyRate: "$90/hr",
    location: "Boston, USA",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    completedJobs: 28,
    verified: true,
    available: true
  },
  {
    id: 5,
    name: "David Lee",
    title: "DevOps Engineer",
    avatar: "DL",
    rating: 4.7,
    reviews: 35,
    hourlyRate: "$85/hr",
    location: "Seattle, USA",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    completedJobs: 45,
    verified: true,
    available: true
  },
  {
    id: 6,
    name: "Amanda Taylor",
    title: "Content Writer & SEO",
    avatar: "AT",
    rating: 4.8,
    reviews: 56,
    hourlyRate: "$45/hr",
    location: "Los Angeles, USA",
    skills: ["SEO", "Content Writing", "Copywriting", "WordPress"],
    completedJobs: 78,
    verified: true,
    available: true
  }
]

const categories = ["All", "Developer", "Designer", "Data Science", "DevOps", "Content"]

export default function FreelancersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFreelancers = freelancers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Discover Freelancers</h1>
          <p className="text-primary-100 text-lg mb-8 text-center md:text-left">
            Find the most talented freelancers and bring your projects to life.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skill, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <p className="text-gray-600 mb-6">{filteredFreelancers.length} freelancers found</p>

        {/* Freelancers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <div key={freelancer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {freelancer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{freelancer.name}</h3>
                    {freelancer.verified && (
                      <CheckCircle className="w-4 h-4 text-primary-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{freelancer.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  {freelancer.rating}
                </span>
                <span className="text-gray-500">({freelancer.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                {freelancer.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {freelancer.skills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {freelancer.skills.length > 3 && (
                  <span className="text-xs text-gray-400">+{freelancer.skills.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-primary-600 font-bold">{freelancer.hourlyRate}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {freelancer.completedJobs} jobs completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {freelancer.available ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Busy</span>
                  )}
                </div>
              </div>

              <Link 
                href="/auth/signup"
                className="mt-4 block w-full text-center bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No freelancers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
