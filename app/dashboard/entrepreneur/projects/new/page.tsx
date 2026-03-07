"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AIChat } from "@/components/ai/ai-chat"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function NewProjectPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    budget: "",
    industry: "",
    timeline: "",
    requirements: "",
  })
  const [projectId, setProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreateProject = async () => {
    if (!projectData.name || !projectData.description) {
      alert("Please fill in at least the project name and description.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectData,
          budget: projectData.budget ? parseFloat(projectData.budget) : null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setProjectId(data.project.id)
        alert("Project created! You can continue with the AI assistant.")
      } else {
        alert("Error: " + (data.error || "Failed to create project"))
      }
    } catch (error) {
      console.error("Error creating project:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 via-white to-primary-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/entrepreneur/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Link href="/dashboard">
              <Logo size="sm" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-turquoise-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-turquoise-600 to-primary-600 bg-clip-text text-transparent">
              Create New Project
            </h1>
          </div>
          <p className="text-gray-600">
            Our AI assistant will help you with project planning, budgeting, and team building
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Project Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                  placeholder="e.g., E-commerce Website"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                  rows={4}
                  placeholder="Describe your project details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    value={projectData.budget}
                    onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                    placeholder="100000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={projectData.industry}
                    onChange={(e) => setProjectData({ ...projectData, industry: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                    placeholder="e.g., E-commerce, Technology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  value={projectData.timeline}
                  onChange={(e) => setProjectData({ ...projectData, timeline: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                  placeholder="e.g., 3 months, 6 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  value={projectData.requirements}
                  onChange={(e) => setProjectData({ ...projectData, requirements: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                  rows={3}
                  placeholder="Technical requirements, features, etc..."
                />
              </div>

              <Button
                onClick={handleCreateProject}
                disabled={loading || !projectData.name || !projectData.description}
                className="w-full bg-gradient-to-r from-turquoise-500 to-primary-500 hover:from-turquoise-600 hover:to-primary-600"
                size="lg"
              >
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="h-[600px]">
              {projectId ? (
                <AIChat
                  projectId={projectId}
                  userId={session.user.id}
                  context={{
                    projectName: projectData.name,
                    budget: projectData.budget,
                    industry: projectData.industry,
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center text-gray-500">
                  <div>
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-turquoise-400" />
                    <p className="text-lg font-semibold mb-2">
                      To Access the AI Assistant
                    </p>
                    <p className="text-sm">
                      First fill in the project information and create the project.
                      <br />
                      Then the AI assistant will help you!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

