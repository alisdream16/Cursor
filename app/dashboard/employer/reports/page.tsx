"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, Users, FolderKanban, DollarSign, Clock } from "lucide-react"

export default function EmployerReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const stats = {
    totalProjects: 12,
    completedProjects: 8,
    activeEmployees: 15,
    totalHours: "2,450",
    revenue: "$125,000",
    avgProjectTime: "45 days"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Company performance reports</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        <div className="flex gap-2">
          {[
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
            { id: "quarter", label: "Quarter" },
            { id: "year", label: "Year" }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                selectedPeriod === period.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Projects", value: stats.totalProjects, icon: FolderKanban, color: "text-blue-600" },
            { label: "Completed", value: stats.completedProjects, icon: FolderKanban, color: "text-green-600" },
            { label: "Active Employees", value: stats.activeEmployees, icon: Users, color: "text-purple-600" },
            { label: "Total Hours", value: stats.totalHours, icon: Clock, color: "text-orange-600" },
            { label: "Revenue", value: stats.revenue, icon: DollarSign, color: "text-green-600" },
            { label: "Avg. Project Time", value: stats.avgProjectTime, icon: Clock, color: "text-blue-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Project Progress Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Project Progress</h3>
          <div className="space-y-4">
            {[
              { name: "New Website", progress: 65, color: "bg-blue-500" },
              { name: "Mobile App", progress: 40, color: "bg-purple-500" },
              { name: "CRM Integration", progress: 10, color: "bg-yellow-500" },
              { name: "API Development", progress: 85, color: "bg-green-500" }
            ].map((project, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className="text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${project.color} rounded-full transition-all`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Employee Performance</h3>
          <div className="h-48 flex items-end justify-around gap-4">
            {["John", "Emily", "Michael", "Sarah", "David"].map((name, i) => {
              const scores = [92, 88, 95, 78, 85]
              return (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 bg-gradient-to-t from-primary-500 to-turquoise-400 rounded-t"
                    style={{ height: `${scores[i]}%` }}
                  />
                  <span className="text-sm text-gray-600">{name}</span>
                  <span className="text-xs font-medium text-primary-600">%{scores[i]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
