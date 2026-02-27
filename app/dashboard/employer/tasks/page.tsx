"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ClipboardList, Plus, User, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  title: string
  project: string
  assignedTo: string
  status: "todo" | "in_progress" | "done" | "overdue"
  priority: "low" | "medium" | "high"
  dueDate: string
}

export default function EmployerTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Homepage tasarımı",
        project: "Yeni Web Sitesi",
        assignedTo: "Ahmet Yılmaz",
        status: "in_progress",
        priority: "high",
        dueDate: "28 Şubat 2026"
      },
      {
        id: "2",
        title: "API geliştirme",
        project: "Yeni Web Sitesi",
        assignedTo: "Mehmet Demir",
        status: "todo",
        priority: "medium",
        dueDate: "5 Mart 2026"
      },
      {
        id: "3",
        title: "Mobil UI tasarımı",
        project: "Mobil Uygulama",
        assignedTo: "Ayşe Kaya",
        status: "done",
        priority: "high",
        dueDate: "25 Şubat 2026"
      }
    ]
    
    setTimeout(() => {
      setTasks(mockTasks)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "done": return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "in_progress": return <Clock className="w-5 h-5 text-blue-500" />
      case "overdue": return <AlertTriangle className="w-5 h-5 text-red-500" />
      default: return <ClipboardList className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityBadge = (priority: Task["priority"]) => {
    const styles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700"
    }
    const labels = { high: "Yüksek", medium: "Orta", low: "Düşük" }
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded ${styles[priority]}`}>
        {labels[priority]}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Görevler</h1>
            <p className="text-gray-600">Tüm proje görevlerini yönetin</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Görev
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Bekleyen", count: tasks.filter(t => t.status === "todo").length, color: "text-gray-600" },
            { label: "Devam Eden", count: tasks.filter(t => t.status === "in_progress").length, color: "text-blue-600" },
            { label: "Tamamlanan", count: tasks.filter(t => t.status === "done").length, color: "text-green-600" },
            { label: "Geciken", count: tasks.filter(t => t.status === "overdue").length, color: "text-red-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Görev</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proje</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Atanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Öncelik</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teslim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{getStatusIcon(task.status)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-gray-600">{task.project}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary-600" />
                        </div>
                        {task.assignedTo}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getPriorityBadge(task.priority)}</td>
                    <td className="px-6 py-4 text-gray-600">{task.dueDate}</td>
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
