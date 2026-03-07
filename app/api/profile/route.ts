import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUserProfile, updateUserProfile, ProfileUpdateData, users, User } from "@/lib/auth-store"

// OAuth kullanıcısını store'a ekle (yoksa)
function ensureUserExists(email: string, name?: string | null): User {
  let user = users.get(email)
  
  if (!user) {
    // OAuth kullanıcısı için yeni kayıt oluştur
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    user = {
      id: userId,
      email: email,
      name: name || "",
      password: "", // OAuth kullanıcıları için boş
      createdAt: new Date(),
    }
    users.set(email, user)
  }
  
  return user
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Kullanıcı yoksa oluştur (OAuth kullanıcıları için)
    ensureUserExists(session.user.email, session.user.name)
    
    const profile = getUserProfile(session.user.email)
    
    if (!profile) {
      // Yine bulunamazsa session'dan dön
      return NextResponse.json({
        id: session.user.id || "temp",
        email: session.user.email,
        name: session.user.name || "",
        phone: "",
        location: "",
        website: "",
        bio: ""
      }, { status: 200 })
    }
    
    return NextResponse.json(profile, { status: 200 })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Kullanıcı yoksa oluştur (OAuth kullanıcıları için)
    ensureUserExists(session.user.email, session.user.name)

    const body = await request.json()
    const { name, phone, location, website, bio } = body

    const updateData: ProfileUpdateData = {}
    if (name !== undefined) updateData.name = name
    if (phone !== undefined) updateData.phone = phone
    if (location !== undefined) updateData.location = location
    if (website !== undefined) updateData.website = website
    if (bio !== undefined) updateData.bio = bio

    const updatedUser = updateUserProfile(session.user.email, updateData)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: "Profil güncellenemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: "Profil başarıyla güncellendi",
        user: updatedUser
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}
