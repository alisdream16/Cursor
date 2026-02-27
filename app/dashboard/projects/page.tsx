"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FolderKanban, Plus, Users, Calendar, MoreVertical, CheckCircle2 } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on_hold"
  progress: number
  members: number
  dueDate: string
  tasks: { total: number; completed: number }
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "HireNUp Website Geliştirme",
    description: "Ana platform web sitesinin geliştirilmesi ve optimizasyonu",
    status: "active",
    progress: 65,
    members: 4,
    dueDate: "2026-04-15",
    tasks: { total: 24, completed: 16 }
  },
  {
    id: "2",
    name: "Mobil Uygulama MVP",
    description: "iOS ve Android için mobil uygulama geliştirme",
    status: "active",
    progress: 30,
    members: 3,
    dueDate: "2026-06-01",
    tasks: { total: 40, completed: 12 }
  },
  {
    id: "3",
    name: "API Entegrasyonları",
    description: "Üçüncü parti API entegrasyonlarının tamamlanması",
    status: "on_hold",
    progress: 80,
    members: 2,
    dueDate: "2026-03-30",
    tasks: { total: 15, completed: 12 }
  },
]

export default function ProjectsPage() {
  const { data: session } = useSession()
  const [projects] = useState<Project[]>(mockProjects)

  if (!session) return null

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Aktif</span>
      case "completed":
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Tamamlandı</span>
      case "on_hold":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Beklemede</span>
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Projelerim</h1>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
        </div>

        {/* Proje Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(project.status)}
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

              {/* İlerleme Çubuğu */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">İlerleme</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Alt Bilgiler */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.members} üye</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{project.tasks.completed}/{project.tasks.total}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.dueDate).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Yeni Proje Kartı */}
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center min-h-[280px] hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-gray-500" />
            </div>
            <span className="text-gray-600 font-medium">Yeni Proje Oluştur</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
