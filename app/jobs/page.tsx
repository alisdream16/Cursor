"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Clock, DollarSign, Briefcase, Building2, Filter, ChevronDown } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "contract" | "remote"
  salary: { min: number; max: number }
  description: string
  skills: string[]
  postedAt: string
  applicants: number
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "New York, USA",
    type: "full-time",
    salary: { min: 85000, max: 120000 },
    description: "We are looking for a senior developer experienced in React and TypeScript who can develop modern web applications.",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    postedAt: "2 days ago",
    applicants: 23
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "remote",
    salary: { min: 65000, max: 95000 },
    description: "We are looking for a UI/UX designer who can create user-focused, modern designs.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    postedAt: "1 week ago",
    applicants: 45
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "DataFlow",
    location: "San Francisco, USA",
    type: "full-time",
    salary: { min: 90000, max: 130000 },
    description: "We are looking for a developer who can build scalable backend systems with Python and Django.",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    postedAt: "3 days ago",
    applicants: 18
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, USA",
    type: "contract",
    salary: { min: 100000, max: 150000 },
    description: "We are looking for a DevOps engineer experienced with AWS and Kubernetes.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    postedAt: "5 days ago",
    applicants: 12
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || job.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeBadge = (type: Job["type"]) => {
    const styles = {
      "full-time": "bg-green-100 text-green-700",
      "part-time": "bg-blue-100 text-blue-700",
      "contract": "bg-orange-100 text-orange-700",
      "remote": "bg-purple-100 text-purple-700"
    }
    const labels = {
      "full-time": "Full Time",
      "part-time": "Part Time",
      "contract": "Contract",
      "remote": "Remote"
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>{labels[type]}</span>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Job Listings</h1>
          <p className="text-primary-100 text-center text-lg mb-8">Find your dream job</p>
          
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <Button className="bg-white text-primary-600 hover:bg-primary-50 w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { value: "all", label: "All" },
            { value: "full-time", label: "Full Time" },
            { value: "part-time", label: "Part Time" },
            { value: "contract", label: "Contract" },
            { value: "remote", label: "Remote" },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setSelectedType(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedType === f.value
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold">{filteredJobs.length}</span> jobs found
        </p>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                    {getTypeBadge(job.type)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.postedAt}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                    <DollarSign className="w-5 h-5" />
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </div>
                  <span className="text-sm text-gray-500">{job.applicants} applicants</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {job.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
