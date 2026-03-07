"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, CheckCircle, XCircle, Clock } from "lucide-react"

interface LeaveRequest {
  id: string
  type: "annual" | "sick" | "personal"
  startDate: string
  endDate: string
  days: number
  status: "pending" | "approved" | "rejected"
  reason: string
}

export default function WorkerLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockLeaves: LeaveRequest[] = [
      {
        id: "1",
        type: "annual",
        startDate: "March 10, 2026",
        endDate: "March 14, 2026",
        days: 5,
        status: "pending",
        reason: "Family visit"
      },
      {
        id: "2",
        type: "sick",
        startDate: "February 20, 2026",
        endDate: "February 21, 2026",
        days: 2,
        status: "approved",
        reason: "Doctor's appointment"
      }
    ]
    
    setTimeout(() => {
      setLeaves(mockLeaves)
      setLoading(false)
    }, 500)
  }, [])

  const getTypeBadge = (type: LeaveRequest["type"]) => {
    const styles = {
      annual: "bg-blue-100 text-blue-700",
      sick: "bg-red-100 text-red-700",
      personal: "bg-purple-100 text-purple-700"
    }
    const labels = { annual: "Annual Leave", sick: "Sick Leave", personal: "Personal" }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type]}`}>
        {labels[type]}
      </span>
    )
  }

  const getStatusBadge = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle className="w-4 h-4" /> Approved</span>
      case "rejected":
        return <span className="flex items-center gap-1 text-red-600 text-sm"><XCircle className="w-4 h-4" /> Rejected</span>
      default:
        return <span className="flex items-center gap-1 text-yellow-600 text-sm"><Clock className="w-4 h-4" /> Pending</span>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Leaves</h1>
            <p className="text-gray-600">Manage your leave requests</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Request Leave
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Remaining Annual Leave</p>
            <p className="text-2xl font-bold text-primary-600">14 days</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Used</p>
            <p className="text-2xl font-bold text-gray-900">6 days</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-600">
              {leaves.filter(l => l.status === "pending").length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : leaves.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests</h3>
            <p className="text-gray-500 mb-4">You haven't made any leave requests yet</p>
            <Button className="bg-primary-500 hover:bg-primary-600">
              Request Leave
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{getTypeBadge(leave.type)}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {leave.startDate} - {leave.endDate}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{leave.days} days</td>
                    <td className="px-6 py-4 text-gray-600">{leave.reason}</td>
                    <td className="px-6 py-4">{getStatusBadge(leave.status)}</td>
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
