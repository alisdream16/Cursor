"use client"

import { SessionProvider } from "next-auth/react"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      {children}
      <AIChatbot />
    </SessionProvider>
  )
}

