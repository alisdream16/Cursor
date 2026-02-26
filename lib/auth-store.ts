// Basit in-memory kullanıcı deposu (geliştirme için)
// Gerçek uygulamada veritabanı kullanılmalı (örn: Prisma + PostgreSQL)

export type AccountType = "FREELANCER" | "ENTREPRENEUR" | "WORKER" | "EMPLOYER" | "INVESTOR"

export interface User {
  id: string
  email: string
  name: string
  password: string
  accountType?: AccountType
  phone?: string
  location?: string
  website?: string
  bio?: string
  createdAt: Date
}

// Global store - sunucu yeniden başlatılana kadar kalıcı
const globalStore = globalThis as unknown as {
  users: Map<string, User> | undefined
}

if (!globalStore.users) {
  globalStore.users = new Map<string, User>()
}

export const users = globalStore.users

export function createUser(email: string, name: string, hashedPassword: string): User {
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const newUser: User = {
    id: userId,
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
  }
  users.set(email, newUser)
  return newUser
}

export function getUserByEmail(email: string): User | undefined {
  return users.get(email)
}

export function updateUserAccountType(email: string, accountType: AccountType): boolean {
  const user = users.get(email)
  if (user) {
    user.accountType = accountType
    users.set(email, user)
    return true
  }
  return false
}

export interface ProfileUpdateData {
  name?: string
  phone?: string
  location?: string
  website?: string
  bio?: string
}

export function updateUserProfile(email: string, data: ProfileUpdateData): User | null {
  const user = users.get(email)
  if (user) {
    if (data.name !== undefined) user.name = data.name
    if (data.phone !== undefined) user.phone = data.phone
    if (data.location !== undefined) user.location = data.location
    if (data.website !== undefined) user.website = data.website
    if (data.bio !== undefined) user.bio = data.bio
    users.set(email, user)
    return user
  }
  return null
}

export function getUserProfile(email: string): Omit<User, 'password'> | null {
  const user = users.get(email)
  if (user) {
    const { password, ...profile } = user
    return profile
  }
  return null
}

