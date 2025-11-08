import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Project } from "@prisma/client" // ← BU SATIRI EKLEYİN

// Project tipi: ilişkili verilerle birlikte
interface ProjectWithRelations extends Project {
  entrepreneur: { id: string; name: string | null } | null
  company: { id: string; name: string | null } | null
  budget: number | null
}

const getProject = async (id: string): Promise<ProjectWithRelations | null> => {
  const result = await prisma.project.findUnique({
    where: { id },
    include: {
      entrepreneur: { select: { id: true, name: true } },
      company: { select: { id: true, name: true } },
    },
  })
  return result as ProjectWithRelations | null
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session as any)?.user?.id || null
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, projectId } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Eksik veri" }, { status: 400 })
    }

    let project: ProjectWithRelations | null = null
    if (projectId) {
      project = await getProject(projectId)
    }

    const budgetText = typeof project?.budget === "number"
      ? `₺${project.budget.toLocaleString("tr-TR")}`
      : "Belirtilmemiş"

    const prompt = `Proje: ${project?.name || "Yeni Proje"}\nBütçe: ${budgetText}\nSoru: ${message}\nCevap ver:`

    const aiResponse = generateMockResponse(prompt, project)

    await prisma.aIChat.create({
      data: {
        userId,
        messages: [
          { type: "user", content: message, timestamp: new Date().toISOString() },
          { type: "assistant", content: aiResponse, timestamp: new Date().toISOString() },
        ],
      },
    })

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

function generateMockResponse(prompt: string, project: ProjectWithRelations | null): string {
  if (prompt.toLowerCase().includes("bütçe")) {
    if (typeof project?.budget === "number") {
      return `Bütçen ₺${project.budget.toLocaleString("tr-TR")} – bu bütçeyle 3 ayda harika bir MVP çıkarabilirsin!`
    }
    return "Bütçeni söylersen sana özel ekip ve plan önerisi yaparım!"
  }
  return "Merhaba! Projen için nasıl yardımcı olabilirim? Bütçe, ekip, planlama... ne istersen sor!"
}

export const dynamic = "force-dynamic"