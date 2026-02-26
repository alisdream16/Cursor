import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { updateUserAccountType, AccountType } from "@/lib/auth-store"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { accountType } = body

    const validTypes: AccountType[] = ["FREELANCER", "ENTREPRENEUR", "WORKER", "EMPLOYER", "INVESTOR"]
    
    if (!accountType || !validTypes.includes(accountType.toUpperCase())) {
      return NextResponse.json(
        { error: "Invalid account type" },
        { status: 400 }
      )
    }

    // Update user account type
    const normalizedType = accountType.toUpperCase() as AccountType
    const updated = updateUserAccountType(session.user.email, normalizedType)
    
    if (!updated) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        message: "Account type updated successfully",
        accountType 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Set account type error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
