"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, User, LogOut, Settings, Bell } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const [showMembershipMenu, setShowMembershipMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { data: session, status } = useSession()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const membershipMenuRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (membershipMenuRef.current && !membershipMenuRef.current.contains(event.target as Node)) {
        setShowMembershipMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Home
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Projects
            </Link>
            <Link href="/freelancers" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Freelancers
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Companies
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Jobs
            </Link>
            {!session && (
              <div className="relative" ref={membershipMenuRef}>
                <button 
                  onClick={() => setShowMembershipMenu(!showMembershipMenu)}
                  className="text-gray-700 hover:text-primary-600 transition font-medium flex items-center gap-1"
                >
                  Membership Types
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMembershipMenu ? 'rotate-180' : ''}`} />
                </button>
                {showMembershipMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                      For Freelancers
                    </div>
                    <Link 
                      href="/auth/signup?type=freelancer" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowMembershipMenu(false)}
                    >
                      Freelancer
                    </Link>
                    <Link 
                      href="/auth/signup?type=worker" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowMembershipMenu(false)}
                    >
                      Worker
                    </Link>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200 mt-2">
                      For Companies
                    </div>
                    <Link 
                      href="/auth/signup?type=employer" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowMembershipMenu(false)}
                    >
                      Employer
                    </Link>
                    <Link 
                      href="/auth/signup?type=entrepreneur" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowMembershipMenu(false)}
                    >
                      Entrepreneur
                    </Link>
                    <Link 
                      href="/auth/signup?type=investor" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowMembershipMenu(false)}
                    >
                      Investor
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
              </div>
            ) : session ? (
              <>
                <Link href="/dashboard/notifications" className="text-gray-700 hover:text-primary-600 transition relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{session.user?.name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <Link 
                        href="/dashboard" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link 
                        href="/dashboard/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link 
                        href="/dashboard/security" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          signOut({ callbackUrl: "/" })
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-gray-700 hover:text-primary-600 transition font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
