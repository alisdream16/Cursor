"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Briefcase, Search, Filter, MapPin, Clock, DollarSign, Building2 } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  postedAt: string
  description: string
}

export default function FreelancerJobsPage() {
  const { data: session } = useSession()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // TODO: Fetch real jobs from API
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior React Developer",
        company: "TechCorp",
        location: "Remote",
        salary: "$80-120/saat",
        type: "Freelance",
        postedAt: "2 gün önce",
        description: "React ve Next.js deneyimli senior geliştirici arıyoruz..."
      },
      {
        id: "2",
        title: "UI/UX Designer",
        company: "DesignStudio",
        location: "İstanbul",
        salary: "$50-80/saat",
        type: "Freelance",
        postedAt: "1 hafta önce",
        description: "Figma ve modern tasarım araçlarında uzman tasarımcı..."
      },
      {
        id: "3",
        title: "Backend Developer - Node.js",
        company: "StartupABC",
        location: "Remote",
        salary: "$70-100/saat",
        type: "Part-time",
        postedAt: "3 gün önce",
        description: "Node.js ve PostgreSQL deneyimli backend geliştirici..."
      }
    ]
    
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 500)
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || job.type.toLowerCase() === filter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İş İlanları</h1>
            <p className="text-gray-600">Size uygun freelance iş fırsatlarını keşfedin</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="İş ara... (pozisyon, şirket)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="freelance">Freelance</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtreler
              </Button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">İş ilanı bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.postedAt}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-semibold text-primary-600 flex items-center gap-1">
                      <DollarSign className="w-5 h-5" />
                      {job.salary}
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
                    Başvur
                  </Button>
                  <Button size="sm" variant="outline">
                    Detaylar
                  </Button>
                  <Button size="sm" variant="ghost">
                    Kaydet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
