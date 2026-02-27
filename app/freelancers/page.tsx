"use client"

import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function FreelancersPage() {
  // Redirect to talent page which has the full implementation
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Freelancer'ları Keşfet</h1>
        <p className="text-gray-600 mb-8">En yetenekli freelancer'ları bulun ve projelerinizi gerçekleştirin.</p>
        <Link 
          href="/talent"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Freelancer'ları Gör →
        </Link>
      </div>
    </div>
  )
}
