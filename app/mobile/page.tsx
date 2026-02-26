import { Header } from "@/components/layout/header"

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HireNUp Mobile</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take HireNUp with you. Manage your work from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Work on the go</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-time notifications</h3>
                  <p className="text-gray-600">Never miss a message or project update</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant messaging</h3>
                  <p className="text-gray-600">Chat with clients and team members</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Track your projects</h3>
                  <p className="text-gray-600">Monitor progress and deadlines</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure access</h3>
                  <p className="text-gray-600">Biometric login and encrypted data</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-turquoise-500 rounded-3xl p-8 text-center">
            <div className="text-8xl mb-6">📲</div>
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-white/90 mb-6">
              Our mobile app is currently in development. Sign up to be notified when it launches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                <span>🍎</span> App Store
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                <span>🤖</span> Google Play
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

