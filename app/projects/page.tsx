"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Search, Filter, Users, DollarSign, Clock, MapPin } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Ticaret Platformu Geliştirme",
    company: "TechCorp",
    description: "Modern ve ölçeklenebilir bir e-ticaret platformu geliştiriyoruz. React, Node.js ve PostgreSQL deneyimi aranıyor.",
    budget: "50.000 - 80.000 ₺",
    duration: "3-4 ay",
    location: "Uzaktan",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    applicants: 12,
    status: "Açık",
    type: "Teknoloji"
  },
  {
    id: 2,
    title: "Mobil Uygulama UI/UX Tasarımı",
    company: "DesignHub",
    description: "Fintech uygulaması için modern ve kullanıcı dostu arayüz tasarımı. Figma ve prototyping deneyimi gerekli.",
    budget: "25.000 - 40.000 ₺",
    duration: "1-2 ay",
    location: "Hibrit - İstanbul",
    skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    applicants: 8,
    status: "Açık",
    type: "Tasarım"
  },
  {
    id: 3,
    title: "Yapay Zeka Chatbot Entegrasyonu",
    company: "DataFlow",
    description: "Müşteri hizmetleri için AI destekli chatbot geliştirme ve entegrasyon projesi.",
    budget: "75.000 - 120.000 ₺",
    duration: "2-3 ay",
    location: "Uzaktan",
    skills: ["Python", "OpenAI API", "NLP", "FastAPI"],
    applicants: 15,
    status: "Açık",
    type: "Yapay Zeka"
  },
  {
    id: 4,
    title: "Kurumsal Web Sitesi Yenileme",
    company: "CloudScale",
    description: "Şirket web sitesinin modern teknolojilerle yeniden tasarlanması ve geliştirilmesi.",
    budget: "30.000 - 50.000 ₺",
    duration: "1-2 ay",
    location: "Uzaktan",
    skills: ["Next.js", "Tailwind CSS", "SEO", "CMS"],
    applicants: 20,
    status: "Açık",
    type: "Web"
  },
  {
    id: 5,
    title: "IoT Dashboard Geliştirme",
    company: "GreenEnergy",
    description: "Yenilenebilir enerji sistemleri için gerçek zamanlı izleme dashboard'u geliştirme.",
    budget: "60.000 - 90.000 ₺",
    duration: "2-3 ay",
    location: "Hibrit - Ankara",
    skills: ["React", "D3.js", "MQTT", "Time Series DB"],
    applicants: 6,
    status: "Açık",
    type: "IoT"
  }
]

const categories = ["Tümü", "Teknoloji", "Tasarım", "Yapay Zeka", "Web", "IoT", "Mobil"]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tümü" || project.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Projeleri Keşfet</h1>
          <p className="text-primary-100 text-lg mb-8">
            Girişimcilerden ve şirketlerden gelen projeleri inceleyin ve başvurun.
          </p>
          
          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Proje, şirket veya beceri ara..."
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
        <p className="text-gray-600 mb-6">{filteredProjects.length} proje bulundu</p>

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
                  Başvur
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
                  {project.applicants} başvuru
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Arama kriterlerinize uygun proje bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}

