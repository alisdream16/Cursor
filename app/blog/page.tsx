import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "10 Tips for Landing Your First Freelance Project",
      excerpt: "Starting your freelance career can be challenging. Here are proven strategies to help you get your first client.",
      author: "Sarah Johnson",
      date: "Nov 25, 2024",
      category: "Freelancing",
      image: "💼"
    },
    {
      title: "How to Build a Winning Team for Your Startup",
      excerpt: "Finding the right people is crucial for startup success. Learn how to identify and attract top talent.",
      author: "Michael Chen",
      date: "Nov 22, 2024",
      category: "Entrepreneurship",
      image: "🚀"
    },
    {
      title: "Remote Work Best Practices in 2024",
      excerpt: "The future of work is here. Discover how to stay productive and connected while working remotely.",
      author: "Emily Davis",
      date: "Nov 18, 2024",
      category: "Work Culture",
      image: "🏠"
    },
    {
      title: "Understanding KYC Verification for Businesses",
      excerpt: "Why identity verification matters and how it protects both employers and freelancers on our platform.",
      author: "David Wilson",
      date: "Nov 15, 2024",
      category: "Security",
      image: "🔒"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and stories from the HireNUp community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center">
                <span className="text-6xl">{post.image}</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-primary-600 font-medium">{post.category}</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.author} · {post.date}</span>
                  <Link href="#" className="text-primary-600 hover:underline text-sm font-medium">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

