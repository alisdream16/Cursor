"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Briefcase, Plus, Eye, Edit, Trash2, Users } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  applicants: number
  status: "active" | "paused" | "closed"
  postedAt: string
}

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        applicants: 45,
        status: "active",
        postedAt: "20 Şubat 2026"
      },
      {
        id: "2",
        title: "Product Designer",
        department: "Design",
        location: "İstanbul",
        type: "Full-time",
        applicants: 28,
        status: "active",
        postedAt: "15 Şubat 2026"
      },
      {
        id: "3",
        title: "Backend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Contract",
        applicants: 12,
        status: "paused",
        postedAt: "10 Şubat 2026"
      }
    ]
    
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusBadge = (status: Job["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      paused: "bg-yellow-100 text-yellow-700",
      closed: "bg-gray-100 text-gray-700"
    }
    const labels = { active: "Aktif", paused: "Durduruldu", closed: "Kapatıldı" }
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
            <h1 className="text-2xl font-bold text-gray-900">İş İlanları</h1>
            <p className="text-gray-600">Açık pozisyonlarınızı yönetin</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni İlan
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Aktif İlanlar</p>
            <p className="text-2xl font-bold text-green-600">
              {jobs.filter(j => j.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Toplam Başvuru</p>
            <p className="text-2xl font-bold text-primary-600">
              {jobs.reduce((sum, j) => sum + j.applicants, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Bu Hafta</p>
            <p className="text-2xl font-bold text-gray-900">+24 başvuru</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">İş ilanı yok</h3>
            <p className="text-gray-500 mb-4">İlk iş ilanınızı oluşturun</p>
            <Button className="bg-primary-500 hover:bg-primary-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni İlan Oluştur
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pozisyon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departman</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasyon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başvuru</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.type}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{job.department}</td>
                    <td className="px-6 py-4 text-gray-600">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-primary-600 font-medium">
                        <Users className="w-4 h-4" />
                        {job.applicants}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(job.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
