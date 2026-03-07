"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Download, Eye, Send } from "lucide-react"

interface Invoice {
  id: string
  number: string
  client: string
  amount: number
  status: "paid" | "pending" | "overdue"
  dueDate: string
  createdAt: string
}

export default function EmployerInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: "1",
        number: "INV-2026-001",
        client: "TechCorp Ltd",
        amount: 5000,
        status: "paid",
        dueDate: "February 15, 2026",
        createdAt: "February 1, 2026"
      },
      {
        id: "2",
        number: "INV-2026-002",
        client: "StartupABC",
        amount: 3500,
        status: "pending",
        dueDate: "March 1, 2026",
        createdAt: "February 15, 2026"
      },
      {
        id: "3",
        number: "INV-2026-003",
        client: "DesignStudio",
        amount: 2000,
        status: "overdue",
        dueDate: "February 20, 2026",
        createdAt: "February 5, 2026"
      }
    ]
    
    setTimeout(() => {
      setInvoices(mockInvoices)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusBadge = (status: Invoice["status"]) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      overdue: "bg-red-100 text-red-700"
    }
    const labels = { paid: "Paid", pending: "Pending", overdue: "Overdue" }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600">Create and track invoices</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.number}</td>
                    <td className="px-6 py-4 text-gray-600">{invoice.client}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Send className="w-4 h-4" /></Button>
                      </div>
                    </td>
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
