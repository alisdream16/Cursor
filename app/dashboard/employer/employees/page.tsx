"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Users, Plus, Mail, Phone, MoreVertical } from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
  joinedAt: string
}

export default function EmployerEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        id: "1",
        name: "John Smith",
        email: "ahmet@company.com",
        role: "Senior Developer",
        department: "Engineering",
        status: "active",
        joinedAt: "January 2024"
      },
      {
        id: "2",
        name: "Emily Chen",
        email: "ayse@company.com",
        role: "Product Manager",
        department: "Product",
        status: "active",
        joinedAt: "March 2024"
      },
      {
        id: "3",
        name: "Mehmet Demir",
        email: "mehmet@company.com",
        role: "UI Designer",
        department: "Design",
        status: "active",
        joinedAt: "June 2024"
      }
    ]
    
    setTimeout(() => {
      setEmployees(mockEmployees)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600">Manage your team and add new employees</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Departments</p>
            <p className="text-2xl font-bold text-primary-600">
              {new Set(employees.map(e => e.department)).size}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : employees.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees</h3>
            <p className="text-gray-500 mb-4">Add your first employee</p>
            <Button className="bg-primary-500 hover:bg-primary-600">
              Invite Employee
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-turquoise-500 flex items-center justify-center text-white font-semibold text-lg">
                      {employee.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-primary-600">{employee.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    {employee.department}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Joined: {employee.joinedAt}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    employee.status === "active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {employee.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
