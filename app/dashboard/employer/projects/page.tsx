"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FolderKanban, Plus, Users, Clock, CheckCircle } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "planning"
  members: number
  progress: number
  deadline: string
}

export default function EmployerProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "Yeni Web Sitesi",
        description: "Şirket web sitesinin yeniden tasarımı",
        status: "active",
        members: 5,
        progress: 65,
        deadline: "15 Mart 2026"
      },
      {
        id: "2",
        name: "Mobil Uygulama",
        description: "iOS ve Android mobil uygulama geliştirme",
        status: "active",
        members: 3,
        progress: 40,
        deadline: "20 Nisan 2026"
      },
      {
        id: "3",
        name: "CRM Entegrasyonu",
        description: "Salesforce CRM entegrasyonu",
        status: "planning",
        members: 2,
        progress: 10,
        deadline: "1 Mayıs 2026"
      }
    ]
    
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusBadge = (status: Project["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      planning: "bg-yellow-100 text-yellow-700"
    }
    const labels = { active: "Aktif", completed: "Tamamlandı", planning: "Planlama" }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
            <p className="text-gray-600">Şirket projelerinizi yönetin</p>
          </div>
          <Link href="/dashboard/employer/projects/new">
            <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Proje
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Toplam", value: projects.length, color: "text-gray-900" },
            { label: "Aktif", value: projects.filter(p => p.status === "active").length, color: "text-green-600" },
            { label: "Planlama", value: projects.filter(p => p.status === "planning").length, color: "text-yellow-600" },
            { label: "Tamamlanan", value: projects.filter(p => p.status === "completed").length, color: "text-blue-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Proje yok</h3>
            <p className="text-gray-500 mb-4">İlk projenizi oluşturun</p>
            <Link href="/dashboard/employer/projects/new">
              <Button className="bg-primary-500 hover:bg-primary-600">
                Yeni Proje Oluştur
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>İlerleme</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.members} kişi
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.deadline}
                  </span>
                </div>

                <Button variant="outline" className="w-full mt-4">
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
