"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, ArrowUpRight } from "lucide-react"

export default function EmployerAccountingPage() {
  const stats = {
    totalRevenue: 125000,
    totalExpenses: 45000,
    profit: 80000,
    pendingPayments: 12500
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Muhasebe</h1>
            <p className="text-gray-600">Finansal durumunuzu takip edin</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/employer/accounting/invoices">
              <Button variant="outline">Faturalar</Button>
            </Link>
            <Link href="/dashboard/employer/accounting/payments">
              <Button className="bg-primary-500 hover:bg-primary-600">Ödemeler</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <p className="text-green-100 text-sm">Toplam Gelir</p>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm">Toplam Gider</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalExpenses.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm">Kâr</p>
            <p className="text-2xl font-bold text-green-600">${stats.profit.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm">Bekleyen Ödeme</p>
            <p className="text-2xl font-bold text-yellow-600">${stats.pendingPayments.toLocaleString()}</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Aylık Gelir/Gider</h3>
          <div className="h-64 flex items-end justify-around gap-4">
            {["Oca", "Şub", "Mar", "Nis", "May", "Haz"].map((month, i) => {
              const revenues = [80, 90, 75, 100, 85, 95]
              const expenses = [40, 35, 45, 50, 40, 45]
              return (
                <div key={month} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex gap-1 items-end justify-center" style={{ height: "200px" }}>
                    <div 
                      className="w-6 bg-green-500 rounded-t"
                      style={{ height: `${revenues[i]}%` }}
                    />
                    <div 
                      className="w-6 bg-red-400 rounded-t"
                      style={{ height: `${expenses[i]}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{month}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" /> Gelir
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded" /> Gider
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/employer/accounting/invoices">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all cursor-pointer">
              <FileText className="w-8 h-8 text-primary-500 mb-3" />
              <h3 className="font-semibold text-gray-900">Faturalar</h3>
              <p className="text-sm text-gray-500">Fatura oluştur ve yönet</p>
            </div>
          </Link>
          <Link href="/dashboard/employer/accounting/payments">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all cursor-pointer">
              <CreditCard className="w-8 h-8 text-primary-500 mb-3" />
              <h3 className="font-semibold text-gray-900">Ödemeler</h3>
              <p className="text-sm text-gray-500">Ödeme geçmişi ve planla</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
