"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [hasCheckedAccountType, setHasCheckedAccountType] = useState(false)

  // Redirect to account-type if no account type (only check once)
  useEffect(() => {
    if (status === "authenticated" && session?.user && !hasCheckedAccountType) {
      const accountType = (session.user as any).accountType
      if (!accountType) {
        router.push("/auth/account-type")
      }
      setHasCheckedAccountType(true)
    }
  }, [session, status, router, hasCheckedAccountType])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const accountType = (session.user as any).accountType

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, <span className="font-semibold">{session.user?.name || session.user?.email}</span>!
        </p>
        {accountType && (
          <p className="text-sm text-gray-500 mt-1">
            Account type: <span className="font-semibold capitalize">{accountType}</span>
          </p>
        )}
      </div>

      {!accountType ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Account Type Not Selected</h2>
          <p className="text-yellow-700 mb-4">
            Please select your account type to continue using all features.
          </p>
          <Link href="/auth/account-type">
            <Button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600">
              Select Account Type
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-gray-600 text-sm mb-4">Manage your profile and settings</p>
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">View Profile</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600 text-sm mb-4">Update security settings</p>
              <Link href="/dashboard/security">
                <Button variant="outline" size="sm">Security Settings</Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">KYC Verification</h3>
              <p className="text-gray-600 text-sm mb-4">Verify your identity</p>
              <Link href="/dashboard/kyc">
                <Button variant="outline" size="sm">Start Verification</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Welcome to your dashboard! Use the sidebar menu to navigate to different sections.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Complete your profile to get better opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Verify your identity through KYC
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">✓</span>
                Enable two-factor authentication for security
              </li>
            </ul>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
