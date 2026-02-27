"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Search, Filter, Star, MapPin, Briefcase, Clock, ChevronDown, X } from "lucide-react"

interface Freelancer {
  id: string
  name: string
  title: string
  avatar: string
  rating: number
  reviews: number
  hourlyRate: number
  location: string
  skills: string[]
  completedJobs: number
  description: string
  availability: "available" | "busy" | "not_available"
}

const mockFreelancers: Freelancer[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    title: "Senior Full Stack Developer",
    avatar: "A",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 75,
    location: "İstanbul, Türkiye",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    completedJobs: 89,
    description: "10+ yıl deneyimli full stack geliştirici. Startup ve enterprise projelerde çalıştım.",
    availability: "available"
  },
  {
    id: "2",
    name: "Zeynep Kaya",
    title: "UI/UX Designer",
    avatar: "Z",
    rating: 4.8,
    reviews: 93,
    hourlyRate: 60,
    location: "Ankara, Türkiye",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    completedJobs: 65,
    description: "Kullanıcı odaklı tasarım uzmanı. Mobil ve web uygulamaları için modern tasarımlar.",
    availability: "available"
  },
  {
    id: "3",
    name: "Mehmet Demir",
    title: "Mobile App Developer",
    avatar: "M",
    rating: 4.7,
    reviews: 78,
    hourlyRate: 65,
    location: "İzmir, Türkiye",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    completedJobs: 52,
    description: "Cross-platform mobil uygulama geliştirme konusunda uzmanım.",
    availability: "busy"
  },
  {
    id: "4",
    name: "Elif Öztürk",
    title: "Data Scientist",
    avatar: "E",
    rating: 4.9,
    reviews: 56,
    hourlyRate: 85,
    location: "İstanbul, Türkiye",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
    completedJobs: 41,
    description: "Veri bilimi ve makine öğrenmesi uzmanı. Büyük veri projeleri deneyimi.",
    availability: "available"
  },
  {
    id: "5",
    name: "Can Arslan",
    title: "DevOps Engineer",
    avatar: "C",
    rating: 4.6,
    reviews: 45,
    hourlyRate: 70,
    location: "Bursa, Türkiye",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    completedJobs: 38,
    description: "Cloud infrastructure ve otomasyon konusunda deneyimli DevOps mühendisi.",
    availability: "not_available"
  },
  {
    id: "6",
    name: "Selin Yıldız",
    title: "Content Writer & SEO Specialist",
    avatar: "S",
    rating: 4.8,
    reviews: 112,
    hourlyRate: 40,
    location: "Antalya, Türkiye",
    skills: ["SEO", "Content Marketing", "Copywriting", "Blog Writing", "Social Media"],
    completedJobs: 156,
    description: "SEO odaklı içerik yazarı. Blog, sosyal medya ve web sitesi içerikleri.",
    availability: "available"
  },
]

const categories = [
  "Tümü",
  "Yazılım Geliştirme",
  "Tasarım",
  "Pazarlama",
  "Veri Bilimi",
  "Yazarlık",
  "Video & Animasyon",
]

const skills = [
  "React", "Node.js", "Python", "TypeScript", "Figma", 
  "AWS", "Docker", "Machine Learning", "SEO", "Flutter"
]

export default function TalentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const filteredFreelancers = mockFreelancers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.some(s => f.skills.includes(s))
    const matchesPrice = f.hourlyRate >= priceRange[0] && f.hourlyRate <= priceRange[1]
    return matchesSearch && matchesSkills && matchesPrice
  })

  const getAvailabilityBadge = (status: Freelancer["availability"]) => {
    switch (status) {
      case "available":
        return <span className="flex items-center gap-1 text-green-600 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Müsait</span>
      case "busy":
        return <span className="flex items-center gap-1 text-yellow-600 text-sm"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>Meşgul</span>
      default:
        return <span className="flex items-center gap-1 text-gray-500 text-sm"><span className="w-2 h-2 bg-gray-400 rounded-full"></span>Müsait Değil</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Yetenekli Freelancer'ları Keşfet</h1>
          <p className="text-xl text-primary-100 text-center mb-8">
            Projeleriniz için en uygun profesyonelleri bulun
          </p>
          
          {/* Arama */}
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Yetenek, beceri veya isim ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-primary-600 hover:bg-primary-50 px-6"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sol Sidebar - Filtreler */}
          <div className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtreler</h3>
                {selectedSkills.length > 0 && (
                  <button 
                    onClick={() => setSelectedSkills([])}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* Kategoriler */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beceriler */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Beceriler</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => {
                        if (selectedSkills.includes(skill)) {
                          setSelectedSkills(selectedSkills.filter(s => s !== skill))
                        } else {
                          setSelectedSkills([...selectedSkills, skill])
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiyat Aralığı */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Saatlik Ücret</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Min"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Max"
                  />
                  <span className="text-gray-500 text-sm">$/saat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Freelancer Listesi */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredFreelancers.length}</span> freelancer bulundu
              </p>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>En Yüksek Puan</option>
                <option>En Düşük Fiyat</option>
                <option>En Yüksek Fiyat</option>
                <option>En Çok İş Tamamlayan</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredFreelancers.map(freelancer => (
                <div
                  key={freelancer.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {freelancer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
                            {getAvailabilityBadge(freelancer.availability)}
                          </div>
                          <p className="text-primary-600 font-medium">{freelancer.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${freelancer.hourlyRate}</p>
                          <p className="text-sm text-gray-500">/saat</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-2 mb-3">{freelancer.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {freelancer.skills.slice(0, 5).map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {freelancer.skills.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                            +{freelancer.skills.length - 5}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium text-gray-900">{freelancer.rating}</span>
                            <span>({freelancer.reviews})</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {freelancer.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {freelancer.completedJobs} iş tamamlandı
                          </span>
                        </div>
                        <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                          Profili Görüntüle
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
