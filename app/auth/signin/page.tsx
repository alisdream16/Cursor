export const dynamic = "force-dynamic"

import { Suspense } from "react"
import SignInContent from "./signin-client"

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}
