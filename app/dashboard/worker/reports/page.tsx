"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Download, BarChart3, TrendingUp } from "lucide-react"

export default function WorkerReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const stats = {
    totalHours: "156h",
    completedTasks: 24,
    activeProjects: 2,
    productivityScore: 92
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Your performance and work reports</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {[
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">Total Work</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600">Completed Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600">Active Projects</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-turquoise-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-sm text-primary-100">Productivity Score</p>
            <p className="text-2xl font-bold">{stats.productivityScore}%</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Work Chart</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const heights = [70, 85, 60, 90, 75, 30, 0]
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 bg-gradient-to-t from-primary-500 to-turquoise-400 rounded-t"
                    style={{ height: `${heights[i]}%` }}
                  />
                  <span className="text-sm text-gray-600">{day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Great Performance!</h3>
          <p className="text-green-700">
            You completed 92% of your goals this week. Keep it up!
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
