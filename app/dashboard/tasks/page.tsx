"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, Plus, Filter, Calendar } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  project?: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Landing page tasarımını tamamla",
    description: "Ana sayfa için yeni tasarımı uygula",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-03-01",
    project: "HireNUp Website"
  },
  {
    id: "2",
    title: "API entegrasyonunu test et",
    description: "Tüm API endpoint'lerini test et ve dokümante et",
    status: "pending",
    priority: "medium",
    dueDate: "2026-03-05",
    project: "Backend Geliştirme"
  },
  {
    id: "3",
    title: "Kullanıcı geri bildirimlerini analiz et",
    description: "Son 1 aylık geri bildirimleri incele",
    status: "completed",
    priority: "low",
    dueDate: "2026-02-20",
  },
]

export default function TasksPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all")

  if (!session) return null

  const filteredTasks = filter === "all" ? tasks : tasks.filter(t => t.status === filter)

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "in_progress": return <Clock className="w-5 h-5 text-yellow-500" />
      default: return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700"
      case "medium": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const toggleStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const statusOrder: Task["status"][] = ["pending", "in_progress", "completed"]
        const currentIndex = statusOrder.indexOf(task.status)
        const nextStatus = statusOrder[(currentIndex + 1) % 3]
        return { ...task, status: nextStatus }
      }
      return task
    }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Görevlerim</h1>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Görev
          </Button>
        </div>

        {/* Filtreler */}
        <div className="flex gap-2 mb-6">
          {[
            { value: "all", label: "Tümü" },
            { value: "pending", label: "Bekleyen" },
            { value: "in_progress", label: "Devam Eden" },
            { value: "completed", label: "Tamamlanan" },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Görev Listesi */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Görev bulunamadı</h3>
              <p className="text-gray-600">Bu kategoride henüz görev yok.</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <button onClick={() => toggleStatus(task.id)} className="mt-1">
                    {getStatusIcon(task.status)}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-medium ${task.status === "completed" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                        {task.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority === "high" ? "Yüksek" : task.priority === "medium" ? "Orta" : "Düşük"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString("tr-TR")}
                      </span>
                      {task.project && (
                        <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                          {task.project}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
