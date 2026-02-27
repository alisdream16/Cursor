"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Zap, Check, ExternalLink } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  connected: boolean
  category: "productivity" | "communication" | "calendar"
}

export default function WorkerIntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Slack",
      description: "Ekip iletişimi ve bildirimler",
      icon: "💬",
      connected: true,
      category: "communication"
    },
    {
      id: "2",
      name: "Google Calendar",
      description: "Takvim senkronizasyonu",
      icon: "📅",
      connected: true,
      category: "calendar"
    },
    {
      id: "3",
      name: "Jira",
      description: "Proje ve görev takibi",
      icon: "📋",
      connected: false,
      category: "productivity"
    },
    {
      id: "4",
      name: "Notion",
      description: "Dokümantasyon ve notlar",
      icon: "📝",
      connected: false,
      category: "productivity"
    },
    {
      id: "5",
      name: "Microsoft Teams",
      description: "Video görüşme ve chat",
      icon: "👥",
      connected: false,
      category: "communication"
    },
    {
      id: "6",
      name: "Outlook",
      description: "E-posta ve takvim",
      icon: "📧",
      connected: false,
      category: "calendar"
    }
  ])

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(i => 
      i.id === id ? { ...i, connected: !i.connected } : i
    ))
  }

  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entegrasyonlar</h1>
          <p className="text-gray-600">Harici araçları HireNUp ile bağlayın</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary-50 to-turquoise-50 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{connectedCount} Entegrasyon Aktif</p>
              <p className="text-sm text-gray-600">
                {integrations.length - connectedCount} entegrasyon daha bağlanabilir
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {["communication", "productivity", "calendar"].map((category) => {
          const categoryIntegrations = integrations.filter(i => i.category === category)
          const labels = {
            communication: "İletişim",
            productivity: "Verimlilik",
            calendar: "Takvim"
          }
          
          return (
            <div key={category} className="space-y-4">
              <h2 className="font-semibold text-gray-900">{labels[category as keyof typeof labels]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`bg-white rounded-xl p-4 border-2 transition-all ${
                      integration.connected 
                        ? "border-green-200 bg-green-50/50" 
                        : "border-gray-200 hover:border-primary-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                      </div>
                      {integration.connected && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={integration.connected ? "outline" : "default"}
                        size="sm"
                        className={integration.connected ? "" : "bg-primary-500 hover:bg-primary-600"}
                        onClick={() => toggleConnection(integration.id)}
                      >
                        {integration.connected ? "Bağlantıyı Kes" : "Bağlan"}
                      </Button>
                      {integration.connected && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
