"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ClipboardList, Plus, CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  title: string
  project: string
  status: "todo" | "in_progress" | "done" | "overdue"
  priority: "low" | "medium" | "high"
  dueDate: string
}

export default function FreelancerTasksPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Complete homepage design",
        project: "E-Commerce Website",
        status: "in_progress",
        priority: "high",
        dueDate: "February 28, 2026"
      },
      {
        id: "2",
        title: "API integration",
        project: "E-Commerce Website",
        status: "todo",
        priority: "medium",
        dueDate: "March 5, 2026"
      },
      {
        id: "3",
        title: "Login page",
        project: "Mobile App UI",
        status: "done",
        priority: "high",
        dueDate: "February 25, 2026"
      },
      {
        id: "4",
        title: "Responsive adjustments",
        project: "E-Commerce Website",
        status: "overdue",
        priority: "high",
        dueDate: "February 20, 2026"
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
    const labels = {
      high: "High",
      medium: "Medium",
      low: "Low"
    }
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded ${styles[priority]}`}>
        {labels[priority]}
      </span>
    )
  }

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(t => t.status === filter)

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === "done" ? "todo" : "done" as Task["status"] }
      }
      return t
    }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">Track tasks for your projects</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-4">
          {[
            { id: "all", label: "All" },
            { id: "todo", label: "To Do" },
            { id: "in_progress", label: "In Progress" },
            { id: "done", label: "Completed" },
            { id: "overdue", label: "Overdue" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                filter === tab.id 
                  ? "bg-primary-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              {tab.id !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  {tasks.filter(t => t.status === tab.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">No tasks in this category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl p-4 border border-gray-200 hover:border-primary-300 transition-all ${
                  task.status === "done" ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium text-gray-900 ${task.status === "done" ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.project}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getPriorityBadge(task.priority)}
                    <span className={`text-sm ${task.status === "overdue" ? "text-red-600 font-medium" : "text-gray-500"}`}>
                      {task.dueDate}
                    </span>
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
