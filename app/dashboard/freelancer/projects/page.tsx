"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FolderKanban, Plus, Clock, CheckCircle, AlertCircle, PlayCircle } from "lucide-react"

interface Project {
  id: string
  name: string
  client: string
  status: "active" | "completed" | "paused" | "pending"
  deadline: string
  progress: number
  budget: string
}

export default function FreelancerProjectsPage() {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch real projects from API
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "E-Ticaret Web Sitesi",
        client: "TechCorp",
        status: "active",
        deadline: "15 Mart 2026",
        progress: 65,
        budget: "$3,500"
      },
      {
        id: "2",
        name: "Mobil Uygulama UI",
        client: "StartupABC",
        status: "pending",
        deadline: "20 Mart 2026",
        progress: 25,
        budget: "$2,000"
      },
      {
        id: "3",
        name: "Dashboard Redesign",
        client: "DesignStudio",
        status: "completed",
        deadline: "10 Şubat 2026",
        progress: 100,
        budget: "$1,500"
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
      paused: "bg-yellow-100 text-yellow-700",
      pending: "bg-gray-100 text-gray-700"
    }
    const labels = {
      active: "Aktif",
      completed: "Tamamlandı",
      paused: "Duraklatıldı",
      pending: "Bekliyor"
    }
    const icons = {
      active: <PlayCircle className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
      paused: <AlertCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />
    }
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projelerim</h1>
            <p className="text-gray-600">Aktif ve geçmiş projelerinizi yönetin</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Proje
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Aktif Projeler", value: projects.filter(p => p.status === "active").length, color: "text-green-600" },
            { label: "Bekleyen", value: projects.filter(p => p.status === "pending").length, color: "text-yellow-600" },
            { label: "Tamamlanan", value: projects.filter(p => p.status === "completed").length, color: "text-blue-600" },
            { label: "Toplam", value: projects.length, color: "text-gray-900" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz proje yok</h3>
            <p className="text-gray-500 mb-4">İlk projenizi oluşturun veya bir iş ilanına başvurun</p>
            <Button className="bg-primary-500 hover:bg-primary-600">
              İş İlanlarına Göz At
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proje</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlerleme</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teslim</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bütçe</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{project.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {project.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {project.deadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {project.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm">Görüntüle</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
