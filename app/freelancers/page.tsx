"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Search, Star, MapPin, Briefcase, CheckCircle } from "lucide-react"

const freelancers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Senior Full Stack Developer",
    avatar: "AY",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "250 ₺/saat",
    location: "İstanbul, Türkiye",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    completedJobs: 52,
    verified: true,
    available: true
  },
  {
    id: 2,
    name: "Elif Kaya",
    title: "UI/UX Designer",
    avatar: "EK",
    rating: 5.0,
    reviews: 38,
    hourlyRate: "200 ₺/saat",
    location: "Ankara, Türkiye",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    completedJobs: 41,
    verified: true,
    available: true
  },
  {
    id: 3,
    name: "Mehmet Demir",
    title: "Mobile App Developer",
    avatar: "MD",
    rating: 4.8,
    reviews: 29,
    hourlyRate: "275 ₺/saat",
    location: "İzmir, Türkiye",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    completedJobs: 33,
    verified: true,
    available: false
  },
  {
    id: 4,
    name: "Zeynep Arslan",
    title: "Data Scientist",
    avatar: "ZA",
    rating: 4.9,
    reviews: 22,
    hourlyRate: "300 ₺/saat",
    location: "Bursa, Türkiye",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    completedJobs: 28,
    verified: true,
    available: true
  },
  {
    id: 5,
    name: "Can Özkan",
    title: "DevOps Engineer",
    avatar: "CO",
    rating: 4.7,
    reviews: 35,
    hourlyRate: "280 ₺/saat",
    location: "Antalya, Türkiye",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    completedJobs: 45,
    verified: true,
    available: true
  },
  {
    id: 6,
    name: "Ayşe Çelik",
    title: "Content Writer & SEO",
    avatar: "AÇ",
    rating: 4.8,
    reviews: 56,
    hourlyRate: "150 ₺/saat",
    location: "İstanbul, Türkiye",
    skills: ["SEO", "Content Writing", "Copywriting", "WordPress"],
    completedJobs: 78,
    verified: true,
    available: true
  }
]

const categories = ["Tümü", "Geliştirici", "Tasarımcı", "Veri Bilimi", "DevOps", "İçerik"]

export default function FreelancersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")

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
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Freelancer'ları Keşfet</h1>
          <p className="text-primary-100 text-lg mb-8">
            En yetenekli freelancer'ları bulun ve projelerinizi gerçekleştirin.
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="İsim, yetenek veya uzmanlık ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
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
        <p className="text-gray-600 mb-6">{filteredFreelancers.length} freelancer bulundu</p>

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
                <span className="text-gray-500">({freelancer.reviews} değerlendirme)</span>
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
                    {freelancer.completedJobs} iş tamamlandı
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {freelancer.available ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Müsait</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Meşgul</span>
                  )}
                </div>
              </div>

              <Link 
                href="/auth/signup"
                className="mt-4 block w-full text-center bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-medium transition"
              >
                Profili Gör
              </Link>
            </div>
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Arama kriterlerinize uygun freelancer bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}
