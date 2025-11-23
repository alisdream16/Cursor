import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorCode: { label: "2FA Code", type: "text", required: false },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          return null
        }

        // Check 2FA if enabled
        if (user.twoFactorEnabled) {
          if (!credentials.twoFactorCode) {
            throw new Error("2FA_CODE_REQUIRED")
          }

          // Verify TOTP code
          const { verifyTOTP } = await import("@/lib/totp")
          const isValid2FA = await verifyTOTP(user.twoFactorSecret!, credentials.twoFactorCode)
          
          if (!isValid2FA) {
            // Check backup codes
            const backupCode = await prisma.twoFactorBackupCode.findFirst({
              where: {
                userId: user.id,
                code: credentials.twoFactorCode,
                used: false,
              },
            })

            if (!backupCode) {
              throw new Error("INVALID_2FA_CODE")
            }

            // Mark backup code as used
            await prisma.twoFactorBackupCode.update({
              where: { id: backupCode.id },
              data: { used: true },
            })
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || null,
          image: user.image || null,
        } as any
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/account-type',
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
          include: {
            profile: true,
            freelancerProfile: true,
            entrepreneurProfile: true,
            workerProfile: true,
            employerProfile: true,
            investorProfile: true,
            kycVerification: true,
          },
        })
        
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.accountType = dbUser.accountType || undefined
          session.user.twoFactorEnabled = dbUser.twoFactorEnabled
          session.user.kycStatus = dbUser.kycVerification?.status || "NOT_STARTED"
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers, check if user exists
        if (account?.provider === "google" || account?.provider === "facebook") {
          if (!user.email) {
            return false
          }

          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { kycVerification: true },
          })

          // If user doesn't exist, they will be created by PrismaAdapter
          // If user exists but no accountType, redirect to account-type page
          if (dbUser && !dbUser.accountType) {
            return true // Allow sign in, will redirect to account-type via pages.newUser
          }

          // Allow sign in but KYC will be required for certain actions
          return true
        }
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
      try {
        // If url is relative, make it absolute
        if (url.startsWith("/")) {
          return `${baseUrl}${url}`
        }
        
        // If url is from same origin, allow it
        const urlObj = new URL(url)
        if (urlObj.origin === baseUrl) {
          return url
        }
        
        // External URL, redirect to baseUrl
        return baseUrl
      } catch (e) {
        // Invalid URL, use baseUrl
        console.error("Invalid redirect URL:", url, e)
        return baseUrl
      }
    },
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
