"use client"

import { Header } from "@/components/layout/header"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: "1",
    title: "10 Secrets to Succeed as a Freelancer",
    excerpt: "The most important strategies and tips you need to know to succeed in your freelance career.",
    author: "John Smith",
    date: "February 20, 2026",
    category: "Career",
    image: "bg-gradient-to-br from-blue-400 to-blue-600"
  },
  {
    id: "2",
    title: "Most In-Demand Software Skills in 2026",
    excerpt: "A comprehensive analysis of the programming languages and technologies companies are looking for most this year.",
    author: "Emily Chen",
    date: "February 18, 2026",
    category: "Technology",
    image: "bg-gradient-to-br from-purple-400 to-purple-600"
  },
  {
    id: "3",
    title: "How to Build a Remote Work Culture",
    excerpt: "Ways to increase productivity and motivation while working remotely with your team.",
    author: "David Lee",
    date: "February 15, 2026",
    category: "Management",
    image: "bg-gradient-to-br from-green-400 to-green-600"
  },
  {
    id: "4",
    title: "Portfolio Building Guide",
    excerpt: "How to create a professional portfolio that will impress potential clients?",
    author: "Sarah Wilson",
    date: "February 12, 2026",
    category: "Career",
    image: "bg-gradient-to-br from-orange-400 to-orange-600"
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-primary-100 text-lg">
            The latest content about career, technology, and business
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className={`h-64 md:h-auto ${posts[0].image}`}></div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  {posts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{posts[0].title}</h2>
                <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {posts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {posts[0].date}
                  </span>
                </div>
                <Link href="#" className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(1).map(post => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className={`h-40 ${post.image}`}></div>
              <div className="p-5">
                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium mb-2">
                  {post.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
