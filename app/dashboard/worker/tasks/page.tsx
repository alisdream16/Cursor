"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ClipboardList, CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  title: string
  project: string
  assignedBy: string
  status: "todo" | "in_progress" | "done" | "overdue"
  priority: "low" | "medium" | "high"
  dueDate: string
}

export default function WorkerTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Login sayfası geliştirme",
        project: "Yeni Web Sitesi Projesi",
        assignedBy: "Ahmet Yılmaz",
        status: "in_progress",
        priority: "high",
        dueDate: "1 Mart 2026"
      },
      {
        id: "2",
        title: "Dashboard bileşenleri",
        project: "Yeni Web Sitesi Projesi",
        assignedBy: "Ahmet Yılmaz",
        status: "todo",
        priority: "medium",
        dueDate: "5 Mart 2026"
      },
      {
        id: "3",
        title: "Unit testler yaz",
        project: "Mobil Uygulama",
        assignedBy: "Mehmet Demir",
        status: "done",
        priority: "low",
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
      default: return <Circle className="w-5 h-5 text-gray-400" />
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görevlerim</h1>
          <p className="text-gray-600">Size atanan görevleri takip edin</p>
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
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Görev yok</h3>
            <p className="text-gray-500">Size atanan görevler burada görünecek</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <p className={`font-medium text-gray-900 ${task.status === "done" ? "line-through opacity-60" : ""}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.project} • Atayan: {task.assignedBy}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getPriorityBadge(task.priority)}
                    <span className="text-sm text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
