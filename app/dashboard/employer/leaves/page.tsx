"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, XCircle, Clock, User } from "lucide-react"

interface LeaveRequest {
  id: string
  employee: string
  type: "annual" | "sick" | "personal"
  startDate: string
  endDate: string
  days: number
  status: "pending" | "approved" | "rejected"
  reason: string
}

export default function EmployerLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockLeaves: LeaveRequest[] = [
      {
        id: "1",
        employee: "John Smith",
        type: "annual",
        startDate: "March 10, 2026",
        endDate: "March 14, 2026",
        days: 5,
        status: "pending",
        reason: "Family visit"
      },
      {
        id: "2",
        employee: "Emily Chen",
        type: "sick",
        startDate: "March 1, 2026",
        endDate: "March 2, 2026",
        days: 2,
        status: "approved",
        reason: "Illness"
      },
      {
        id: "3",
        employee: "Mehmet Demir",
        type: "personal",
        startDate: "March 15, 2026",
        endDate: "March 15, 2026",
        days: 1,
        status: "pending",
        reason: "Personal matters"
      }
    ]
    
    setTimeout(() => {
      setLeaves(mockLeaves)
      setLoading(false)
    }, 500)
  }, [])

  const handleApprove = (id: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: "approved" as const } : l))
  }

  const handleReject = (id: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: "rejected" as const } : l))
  }

  const getTypeBadge = (type: LeaveRequest["type"]) => {
    const styles = {
      annual: "bg-blue-100 text-blue-700",
      sick: "bg-red-100 text-red-700",
      personal: "bg-purple-100 text-purple-700"
    }
    const labels = { annual: "Annual", sick: "Sick", personal: "Personal" }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type]}`}>
        {labels[type]}
      </span>
    )
  }

  const getStatusBadge = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4" /> Approved</span>
      case "rejected":
        return <span className="flex items-center gap-1 text-red-600 text-sm font-medium"><XCircle className="w-4 h-4" /> Rejected</span>
      default:
        return <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium"><Clock className="w-4 h-4" /> Pending</span>
    }
  }

  const pendingCount = leaves.filter(l => l.status === "pending").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600">Manage employee leave requests</p>
          </div>
          {pendingCount > 0 && (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
              {pendingCount} pending requests
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Approved (This Month)</p>
            <p className="text-2xl font-bold text-green-600">
              {leaves.filter(l => l.status === "approved").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Leave Days</p>
            <p className="text-2xl font-bold text-gray-900">
              {leaves.filter(l => l.status === "approved").reduce((sum, l) => sum + l.days, 0)} days
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
            <p className="text-gray-500">No leave requests found yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className={`bg-white rounded-xl p-6 border-2 ${
                  leave.status === "pending" 
                    ? "border-yellow-200" 
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{leave.employee}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        {getTypeBadge(leave.type)}
                        <span className="text-sm text-gray-500">
                          {leave.startDate} - {leave.endDate} ({leave.days} days)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Reason: {leave.reason}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {leave.status === "pending" ? (
                      <>
                        <Button 
                          onClick={() => handleApprove(leave.id)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleReject(leave.id)}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    ) : (
                      getStatusBadge(leave.status)
                    )}
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
