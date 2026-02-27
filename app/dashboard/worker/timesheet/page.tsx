"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Clock, Play, Pause, Calendar } from "lucide-react"

interface TimeEntry {
  id: string
  date: string
  project: string
  task: string
  startTime: string
  endTime: string
  duration: string
}

export default function WorkerTimesheetPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const mockEntries: TimeEntry[] = [
      {
        id: "1",
        date: "27 Şubat 2026",
        project: "Yeni Web Sitesi Projesi",
        task: "Login sayfası geliştirme",
        startTime: "09:00",
        endTime: "12:30",
        duration: "3s 30dk"
      },
      {
        id: "2",
        date: "27 Şubat 2026",
        project: "Yeni Web Sitesi Projesi",
        task: "Dashboard bileşenleri",
        startTime: "13:30",
        endTime: "17:00",
        duration: "3s 30dk"
      },
      {
        id: "3",
        date: "26 Şubat 2026",
        project: "Mobil Uygulama",
        task: "Unit testler",
        startTime: "09:00",
        endTime: "18:00",
        duration: "8s"
      }
    ]
    
    setTimeout(() => {
      setEntries(mockEntries)
      setLoading(false)
    }, 500)
  }, [])

  const todayTotal = "7s 0dk"
  const weekTotal = "32s 15dk"

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Çalışma Saatleri</h1>
            <p className="text-gray-600">Günlük çalışma saatlerinizi takip edin</p>
          </div>
          <Button 
            onClick={() => setIsTracking(!isTracking)}
            className={`flex items-center gap-2 ${
              isTracking 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-primary-500 hover:bg-primary-600"
            }`}
          >
            {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isTracking ? "Durdur" : "Başlat"}
          </Button>
        </div>

        {/* Timer */}
        {isTracking && (
          <div className="bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100">Şu an çalışıyorsunuz</p>
                <p className="text-3xl font-bold font-mono">02:34:12</p>
              </div>
              <div className="text-right">
                <p className="text-primary-100">Proje</p>
                <p className="font-semibold">Yeni Web Sitesi Projesi</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Bugün</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{todayTotal}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Bu Hafta</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{weekTotal}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Hedef</span>
            </div>
            <p className="text-2xl font-bold text-primary-600">40s / hafta</p>
          </div>
        </div>

        {/* Entries */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Son Kayıtlar</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proje</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Görev</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlangıç</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bitiş</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Süre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.startTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.endTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                      {entry.duration}
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
