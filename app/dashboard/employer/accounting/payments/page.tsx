"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Payment {
  id: string
  description: string
  type: "income" | "expense"
  amount: number
  category: string
  date: string
}

export default function EmployerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: "1",
        description: "Proje Ödemesi - TechCorp",
        type: "income",
        amount: 5000,
        category: "Proje Geliri",
        date: "25 Şubat 2026"
      },
      {
        id: "2",
        description: "Freelancer Ödemesi - Ahmet Y.",
        type: "expense",
        amount: 1500,
        category: "Personel Gideri",
        date: "24 Şubat 2026"
      },
      {
        id: "3",
        description: "Yazılım Lisansı",
        type: "expense",
        amount: 200,
        category: "Operasyonel Gider",
        date: "20 Şubat 2026"
      },
      {
        id: "4",
        description: "Danışmanlık Geliri",
        type: "income",
        amount: 2500,
        category: "Hizmet Geliri",
        date: "18 Şubat 2026"
      }
    ]
    
    setTimeout(() => {
      setPayments(mockPayments)
      setLoading(false)
    }, 500)
  }, [])

  const totalIncome = payments.filter(p => p.type === "income").reduce((sum, p) => sum + p.amount, 0)
  const totalExpense = payments.filter(p => p.type === "expense").reduce((sum, p) => sum + p.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ödemeler</h1>
            <p className="text-gray-600">Gelir ve gider takibi</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Ödeme
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Toplam Gelir</span>
            </div>
            <p className="text-3xl font-bold text-green-700">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">Toplam Gider</span>
            </div>
            <p className="text-3xl font-bold text-red-700">${totalExpense.toLocaleString()}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Son İşlemler</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <div key={payment.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payment.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {payment.type === "income" 
                        ? <ArrowUpRight className="w-5 h-5 text-green-600" />
                        : <ArrowDownRight className="w-5 h-5 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">{payment.category} • {payment.date}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-semibold ${
                    payment.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {payment.type === "income" ? "+" : "-"}${payment.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
