import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function PostsPage() {
  const posts = [
    {
      author: "Alex Johnson",
      role: "Full-Stack Developer",
      time: "2 hours ago",
      content: "Just completed a challenging e-commerce project using Next.js and Stripe. The client was thrilled with the results! 🚀",
      likes: 24,
      comments: 5
    },
    {
      author: "Maria Garcia",
      role: "UI/UX Designer",
      time: "5 hours ago",
      content: "Excited to share my latest case study on redesigning a fintech app. User satisfaction increased by 40%! Check it out in my portfolio.",
      likes: 42,
      comments: 12
    },
    {
      author: "James Chen",
      role: "Data Scientist",
      time: "1 day ago",
      content: "Looking for collaborators on an open-source machine learning project. If you&apos;re passionate about AI ethics, let&apos;s connect!",
      likes: 18,
      comments: 8
    },
    {
      author: "Sarah Miller",
      role: "Content Writer",
      time: "1 day ago",
      content: "Top 5 tips for writing compelling product descriptions that convert. Thread below 👇",
      likes: 56,
      comments: 15
    },
    {
      author: "David Kim",
      role: "Mobile Developer",
      time: "2 days ago",
      content: "React Native vs Flutter in 2024 - here&apos;s my honest comparison after building apps with both frameworks.",
      likes: 89,
      comments: 34
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Posts</h1>
          <p className="text-xl text-gray-600">
            See what our community is sharing.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-turquoise-400 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.role} · {post.time}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-primary-600 transition">
                  ❤️ {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-primary-600 transition">
                  💬 {post.comments}
                </button>
                <button className="hover:text-primary-600 transition">
                  🔗 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition">
            Load More Posts
          </button>
        </div>
      </main>
    </div>
  )
}

