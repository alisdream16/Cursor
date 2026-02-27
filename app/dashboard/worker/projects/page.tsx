"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FolderKanban, Clock, CheckCircle, Users } from "lucide-react"

interface Project {
  id: string
  name: string
  company: string
  role: string
  status: "active" | "completed"
  members: number
  deadline: string
}

export default function WorkerProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "Yeni Web Sitesi Projesi",
        company: "TechCorp",
        role: "Frontend Developer",
        status: "active",
        members: 5,
        deadline: "15 Mart 2026"
      },
      {
        id: "2",
        name: "Mobil Uygulama",
        company: "TechCorp",
        role: "UI Designer",
        status: "active",
        members: 3,
        deadline: "20 Nisan 2026"
      }
    ]
    
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600">Dahil olduğunuz şirket projeleri</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz proje yok</h3>
            <p className="text-gray-500">Bir projeye atandığınızda burada görünecek</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.company}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === "active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {project.status === "active" ? "Aktif" : "Tamamlandı"}
                  </span>
                </div>
                <p className="text-sm text-primary-600 font-medium mb-3">{project.role}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.members} kişi
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.deadline}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Detaylar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
