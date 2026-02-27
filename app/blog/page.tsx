"use client"

import { Header } from "@/components/layout/header"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: "1",
    title: "Freelancer Olarak Başarılı Olmanın 10 Sırrı",
    excerpt: "Freelance kariyerinizde başarıya ulaşmak için bilmeniz gereken en önemli stratejiler ve ipuçları.",
    author: "Ahmet Yılmaz",
    date: "20 Şubat 2026",
    category: "Kariyer",
    image: "bg-gradient-to-br from-blue-400 to-blue-600"
  },
  {
    id: "2",
    title: "2026'da En Çok Aranan Yazılım Becerileri",
    excerpt: "Bu yıl şirketlerin en çok aradığı programlama dilleri ve teknolojiler hakkında kapsamlı bir analiz.",
    author: "Zeynep Kaya",
    date: "18 Şubat 2026",
    category: "Teknoloji",
    image: "bg-gradient-to-br from-purple-400 to-purple-600"
  },
  {
    id: "3",
    title: "Uzaktan Çalışma Kültürü Nasıl Oluşturulur?",
    excerpt: "Ekibinizle uzaktan çalışırken verimliliği ve motivasyonu artırmanın yolları.",
    author: "Can Demir",
    date: "15 Şubat 2026",
    category: "İş Yönetimi",
    image: "bg-gradient-to-br from-green-400 to-green-600"
  },
  {
    id: "4",
    title: "Portföy Oluşturma Rehberi",
    excerpt: "Potansiyel müşterileri etkileyecek profesyonel bir portföy nasıl hazırlanır?",
    author: "Elif Öztürk",
    date: "12 Şubat 2026",
    category: "Kariyer",
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
            Kariyer, teknoloji ve iş dünyası hakkında en güncel içerikler
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
                  Devamını Oku <ArrowRight className="w-4 h-4" />
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
