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
        startDate: "10 Mart 2026",
        endDate: "14 Mart 2026",
        days: 5,
        status: "pending",
        reason: "Aile ziyareti"
      },
      {
        id: "2",
        type: "sick",
        startDate: "20 Şubat 2026",
        endDate: "21 Şubat 2026",
        days: 2,
        status: "approved",
        reason: "Doktor randevusu"
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
    const labels = { annual: "Yıllık İzin", sick: "Hastalık", personal: "Kişisel" }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type]}`}>
        {labels[type]}
      </span>
    )
  }

  const getStatusBadge = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle className="w-4 h-4" /> Onaylandı</span>
      case "rejected":
        return <span className="flex items-center gap-1 text-red-600 text-sm"><XCircle className="w-4 h-4" /> Reddedildi</span>
      default:
        return <span className="flex items-center gap-1 text-yellow-600 text-sm"><Clock className="w-4 h-4" /> Bekliyor</span>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İzinlerim</h1>
            <p className="text-gray-600">İzin taleplerinizi yönetin</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            İzin Talep Et
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Kalan Yıllık İzin</p>
            <p className="text-2xl font-bold text-primary-600">14 gün</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Kullanılan</p>
            <p className="text-2xl font-bold text-gray-900">6 gün</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Bekleyen Talep</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">İzin talebi yok</h3>
            <p className="text-gray-500 mb-4">Henüz izin talebinde bulunmadınız</p>
            <Button className="bg-primary-500 hover:bg-primary-600">
              İzin Talep Et
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tür</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gün</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sebep</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{getTypeBadge(leave.type)}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {leave.startDate} - {leave.endDate}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{leave.days} gün</td>
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
