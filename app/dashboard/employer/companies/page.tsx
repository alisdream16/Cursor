"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Users, FolderKanban, Settings } from "lucide-react"

interface Company {
  id: string
  name: string
  logo?: string
  industry: string
  employees: number
  projects: number
  role: string
}

export default function EmployerCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockCompanies: Company[] = [
      {
        id: "1",
        name: "TechCorp Solutions",
        industry: "Teknoloji",
        employees: 15,
        projects: 8,
        role: "Kurucu"
      },
      {
        id: "2",
        name: "Design Studio Pro",
        industry: "Tasarım",
        employees: 5,
        projects: 3,
        role: "Yönetici"
      }
    ]
    
    setTimeout(() => {
      setCompanies(mockCompanies)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Şirketlerim</h1>
            <p className="text-gray-600">Şirketlerinizi yönetin</p>
          </div>
          <Link href="/dashboard/employer/company/create">
            <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Şirket
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz şirket yok</h3>
            <p className="text-gray-500 mb-4">İlk şirketinizi oluşturun</p>
            <Link href="/dashboard/employer/company/create">
              <Button className="bg-primary-500 hover:bg-primary-600">
                Şirket Oluştur
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-turquoise-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      {company.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    {company.role}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{company.employees} çalışan</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FolderKanban className="w-4 h-4" />
                    <span className="text-sm">{company.projects} proje</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Detaylar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
