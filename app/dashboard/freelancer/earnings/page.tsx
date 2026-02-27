"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, Download } from "lucide-react"

interface Earning {
  id: string
  project: string
  client: string
  amount: number
  date: string
  status: "paid" | "pending" | "processing"
}

export default function FreelancerEarningsPage() {
  const { data: session } = useSession()
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockEarnings: Earning[] = [
      {
        id: "1",
        project: "E-Ticaret Web Sitesi",
        client: "TechCorp",
        amount: 1500,
        date: "25 Şubat 2026",
        status: "paid"
      },
      {
        id: "2",
        project: "Dashboard Redesign",
        client: "DesignStudio",
        amount: 1500,
        date: "20 Şubat 2026",
        status: "paid"
      },
      {
        id: "3",
        project: "Mobil Uygulama UI",
        client: "StartupABC",
        amount: 800,
        date: "Bekleniyor",
        status: "pending"
      },
      {
        id: "4",
        project: "API Geliştirme",
        client: "TechCorp",
        amount: 1200,
        date: "İşleniyor",
        status: "processing"
      }
    ]
    
    setTimeout(() => {
      setEarnings(mockEarnings)
      setLoading(false)
    }, 500)
  }, [])

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0)
  const paidEarnings = earnings.filter(e => e.status === "paid").reduce((sum, e) => sum + e.amount, 0)
  const pendingEarnings = earnings.filter(e => e.status !== "paid").reduce((sum, e) => sum + e.amount, 0)

  const getStatusBadge = (status: Earning["status"]) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700"
    }
    const labels = {
      paid: "Ödendi",
      pending: "Bekliyor",
      processing: "İşleniyor"
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
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
            <h1 className="text-2xl font-bold text-gray-900">Kazançlarım</h1>
            <p className="text-gray-600">Gelirlerinizi ve ödemelerinizi takip edin</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Rapor İndir
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <p className="text-green-100 text-sm">Toplam Kazanç</p>
            <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-blue-500" />
              <span className="text-green-500 text-sm font-medium flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                +12%
              </span>
            </div>
            <p className="text-gray-600 text-sm">Ödenen</p>
            <p className="text-2xl font-bold text-gray-900">${paidEarnings.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm">Bekleyen</p>
            <p className="text-2xl font-bold text-gray-900">${pendingEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Earnings Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Son Ödemeler</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proje</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {earning.project}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {earning.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {earning.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(earning.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                      ${earning.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Withdraw Section */}
        <div className="bg-gradient-to-r from-primary-50 to-turquoise-50 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Para Çekme</h3>
              <p className="text-gray-600 text-sm">Kazançlarınızı banka hesabınıza aktarın</p>
            </div>
            <Button className="bg-primary-500 hover:bg-primary-600">
              Para Çek
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
