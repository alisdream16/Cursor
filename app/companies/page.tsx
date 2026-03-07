"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Users, Building2, Globe, Star, Briefcase } from "lucide-react"

interface Company {
  id: string
  name: string
  logo: string
  industry: string
  location: string
  size: string
  rating: number
  reviews: number
  openJobs: number
  description: string
  verified: boolean
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp",
    logo: "T",
    industry: "Technology",
    location: "New York, USA",
    size: "100-500",
    rating: 4.5,
    reviews: 127,
    openJobs: 12,
    description: "Leading technology company offering innovative software solutions.",
    verified: true
  },
  {
    id: "2",
    name: "DesignHub",
    logo: "D",
    industry: "Design",
    location: "San Francisco, USA",
    size: "50-100",
    rating: 4.8,
    reviews: 89,
    openJobs: 5,
    description: "Creative design agency specializing in branding and digital design.",
    verified: true
  },
  {
    id: "3",
    name: "DataFlow",
    logo: "DF",
    industry: "Data Analytics",
    location: "Austin, USA",
    size: "20-50",
    rating: 4.3,
    reviews: 45,
    openJobs: 8,
    description: "Startup offering big data and AI solutions.",
    verified: false
  },
  {
    id: "4",
    name: "CloudScale",
    logo: "C",
    industry: "Cloud Services",
    location: "Remote",
    size: "200-500",
    rating: 4.6,
    reviews: 203,
    openJobs: 15,
    description: "Enterprise cloud infrastructure and DevOps solutions.",
    verified: true
  },
  {
    id: "5",
    name: "GreenEnergy",
    logo: "G",
    industry: "Energy",
    location: "Boston, USA",
    size: "500+",
    rating: 4.2,
    reviews: 312,
    openJobs: 7,
    description: "Renewable energy technologies and solutions.",
    verified: true
  },
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  const industries = ["all", "Technology", "Design", "Data Analytics", "Cloud Services", "Energy"]

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = selectedIndustry === "all" || company.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Discover Companies</h1>
          <p className="text-primary-100 text-center text-lg mb-8">Find opportunities at the best companies</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies or industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedIndustry === industry
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {industry === "all" ? "All" : industry}
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold">{filteredCompanies.length}</span> companies found
        </p>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                    {company.verified && (
                      <span className="text-primary-500" title="Verified">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-primary-600">{company.industry}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{company.description}</p>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {company.size} employees
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {company.rating} ({company.reviews} reviews)
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <Briefcase className="w-4 h-4" />
                  {company.openJobs} open positions
                </span>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
