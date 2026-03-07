"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Shield, User, Check, X } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export default function EmployerPermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const allPermissions = [
    { id: "projects_view", label: "View Projects" },
    { id: "projects_edit", label: "Edit Projects" },
    { id: "tasks_manage", label: "Manage Tasks" },
    { id: "employees_view", label: "View Employees" },
    { id: "employees_manage", label: "Manage Employees" },
    { id: "accounting_view", label: "View Accounting" },
    { id: "accounting_manage", label: "Manage Accounting" },
    { id: "reports_view", label: "View Reports" }
  ]

  useEffect(() => {
    const mockRoles: Role[] = [
      {
        id: "1",
        name: "Admin",
        description: "Full access permission",
        permissions: allPermissions.map(p => p.id),
        userCount: 2
      },
      {
        id: "2",
        name: "Project Manager",
        description: "Project and task management",
        permissions: ["projects_view", "projects_edit", "tasks_manage", "employees_view", "reports_view"],
        userCount: 3
      },
      {
        id: "3",
        name: "Employee",
        description: "Basic access",
        permissions: ["projects_view", "tasks_manage"],
        userCount: 10
      }
    ]
    
    setTimeout(() => {
      setRoles(mockRoles)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Permission Management</h1>
            <p className="text-gray-600">Manage roles and permissions</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600">
            Create New Role
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {role.userCount} users
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Permissions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {allPermissions.map((perm) => {
                      const hasPermission = role.permissions.includes(perm.id)
                      return (
                        <div
                          key={perm.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            hasPermission 
                              ? "bg-green-50 text-green-700" 
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {hasPermission 
                            ? <Check className="w-4 h-4" />
                            : <X className="w-4 h-4" />
                          }
                          {perm.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
