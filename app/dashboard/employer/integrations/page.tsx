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
  category: "hr" | "accounting" | "communication" | "productivity"
}

export default function EmployerIntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "1", name: "Slack", description: "Team communication", icon: "💬", connected: true, category: "communication" },
    { id: "2", name: "Google Workspace", description: "Email and documents", icon: "📧", connected: true, category: "productivity" },
    { id: "3", name: "QuickBooks", description: "Accounting software", icon: "📊", connected: false, category: "accounting" },
    { id: "4", name: "Gusto", description: "Payroll and HR", icon: "👥", connected: false, category: "hr" },
    { id: "5", name: "Jira", description: "Project management", icon: "📋", connected: true, category: "productivity" },
    { id: "6", name: "Zoom", description: "Video conferencing", icon: "📹", connected: false, category: "communication" }
  ])

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(i => 
      i.id === id ? { ...i, connected: !i.connected } : i
    ))
  }

  const categories = {
    communication: "Communication",
    productivity: "Productivity",
    accounting: "Accounting",
    hr: "Human Resources"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect your business tools with HireNUp</p>
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-turquoise-50 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {integrations.filter(i => i.connected).length} Integrations Active
              </p>
              <p className="text-sm text-gray-600">
                {integrations.filter(i => !i.connected).length} more integrations can be connected
              </p>
            </div>
          </div>
        </div>

        {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => {
          const categoryIntegrations = integrations.filter(i => i.category === category)
          
          return (
            <div key={category} className="space-y-4">
              <h2 className="font-semibold text-gray-900">{categories[category]}</h2>
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
                        {integration.connected ? "Disconnect" : "Connect"}
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
