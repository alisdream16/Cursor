import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function ArticlesPage() {
  const articles = [
    {
      title: "The Future of Remote Work: Trends to Watch in 2025",
      excerpt: "As we move into 2025, remote work continues to evolve. Here are the key trends shaping how we work.",
      author: "Editorial Team",
      date: "Nov 28, 2024",
      readTime: "8 min read",
      category: "Industry Trends"
    },
    {
      title: "How to Build a Six-Figure Freelance Career",
      excerpt: "Learn the strategies top freelancers use to earn over $100,000 per year while maintaining work-life balance.",
      author: "Career Insights",
      date: "Nov 25, 2024",
      readTime: "12 min read",
      category: "Career Growth"
    },
    {
      title: "The Complete Guide to Client Communication",
      excerpt: "Master the art of professional communication to build lasting relationships with your clients.",
      author: "Professional Development",
      date: "Nov 22, 2024",
      readTime: "10 min read",
      category: "Skills"
    },
    {
      title: "Understanding Contracts: What Every Freelancer Should Know",
      excerpt: "Protect yourself and your business with proper contracts. Here's what to include and what to avoid.",
      author: "Legal Insights",
      date: "Nov 18, 2024",
      readTime: "15 min read",
      category: "Legal"
    },
    {
      title: "AI Tools That Are Transforming Freelance Work",
      excerpt: "Discover the AI tools that can help you work smarter, not harder, and stay competitive in the market.",
      author: "Tech Trends",
      date: "Nov 15, 2024",
      readTime: "7 min read",
      category: "Technology"
    }
  ]

  const categories = ["All", "Industry Trends", "Career Growth", "Skills", "Legal", "Technology"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In-depth guides and insights to help you succeed.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                i === 0
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {articles.map((article, i) => (
            <article key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-sm text-primary-600 font-medium">{article.category}</span>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                    <Link href="#" className="hover:text-primary-600 transition">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-primary-600 hover:underline font-medium whitespace-nowrap"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition">
            Load More Articles
          </button>
        </div>
      </main>
    </div>
  )
}

