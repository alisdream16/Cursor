import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from "bcryptjs"
import { getUserByEmail, users, User } from "@/lib/auth-store"

// Helper to create/update OAuth user in store
function createOrUpdateOAuthUser(email: string, name: string): User {
  const existingUser = getUserByEmail(email)
  if (existingUser) {
    return existingUser
  }
  
  const userId = `oauth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const newUser: User = {
    id: userId,
    email,
    name: name || email.split('@')[0],
    password: '', // OAuth users don't have password
    createdAt: new Date(),
  }
  users.set(email, newUser)
  return newUser
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = getUserByEmail(credentials.email)
        
        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers, create/update user in store
      if (account?.provider === "google" || account?.provider === "facebook") {
        if (user.email) {
          createOrUpdateOAuthUser(user.email, user.name || "")
        }
      }
      return true
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      
      // For OAuth sign in, ensure user exists in store and get accountType
      if (account?.provider && token.email) {
        const storeUser = getUserByEmail(token.email as string)
        if (storeUser) {
          token.id = storeUser.id
          token.accountType = storeUser.accountType
          token.isNewUser = !storeUser.accountType // Yeni kullanıcı mı?
        }
      }
      
      // Always get fresh accountType from store
      if (token.email) {
        const dbUser = getUserByEmail(token.email as string)
        if (dbUser) {
          token.accountType = dbUser.accountType
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).accountType = token.accountType as string | undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Signin sayfasına geri dönmeyi engelle
      if (url.includes("/auth/signin") || url.includes("/api/auth/signin")) {
        return `${baseUrl}/auth/account-type`
      }
      
      // Account-type veya dashboard'a izin ver
      if (url.includes("/auth/account-type") || url.includes("/dashboard")) {
        return url
      }
      
      // Callback URL baseUrl ile başlıyorsa izin ver (ama signin değilse)
      if (url.startsWith(baseUrl) && !url.includes("/auth/signin")) {
        return url
      }
      
      // Varsayılan: account-type sayfasına git
      return `${baseUrl}/auth/account-type`
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
