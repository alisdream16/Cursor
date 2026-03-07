"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Book, HelpCircle } from "lucide-react"

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is HireNUp?",
        a: "HireNUp is a comprehensive work platform that brings together freelancers, companies, and employees. It offers features like project management, job listings, finding freelancers, and team management."
      },
      {
        q: "Is it free to create an account?",
        a: "Yes, signing up for HireNUp is completely free. You can use all premium features free for the first month."
      },
      {
        q: "What account types do you offer?",
        a: "We currently offer 3 different account types: Freelancer, Company, and Employee. Entrepreneur and Investor accounts will be available soon."
      }
    ]
  },
  {
    category: "For Freelancers",
    questions: [
      {
        q: "How can I find work as a freelancer?",
        a: "After creating your profile, you can apply to suitable jobs from the 'Job Listings' section or wait to be discovered by companies on the 'Find Talent' page."
      },
      {
        q: "What are the commission rates?",
        a: "Silver (free) plan has 15% commission, Gold plan has 5%, and Platinum plan has 0% commission."
      }
    ]
  },
  {
    category: "For Companies",
    questions: [
      {
        q: "How can I post a job listing?",
        a: "You can create a new listing from the 'Job Listings' section in your dashboard. Once your listing is approved, freelancers can apply."
      },
      {
        q: "How do I add my employees to the platform?",
        a: "You can send invitations from the 'Employees' section in the dashboard. When your employees accept the invitation, they will be automatically connected to your company."
      }
    ]
  },
  {
    category: "Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "You can pay by credit/debit card, bank transfer, and PayPal."
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel your subscription at any time. Your access will continue for the remaining period."
      }
    ]
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-primary-100 mb-8">How can we help you?</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a question or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Book className="w-6 h-6" />, title: "Getting Started", link: "#" },
            { icon: <HelpCircle className="w-6 h-6" />, title: "FAQ", link: "#faq" },
            { icon: <MessageCircle className="w-6 h-6" />, title: "Live Support", link: "#" },
            { icon: <Mail className="w-6 h-6" />, title: "Send Email", link: "mailto:support@hirenup.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-3">
                {item.icon}
              </div>
              <div className="font-medium text-gray-900">{item.title}</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`
                  const isOpen = openItems.includes(itemId)
                  return (
                    <div key={qIndex} className="bg-white rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-600">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-primary-50 rounded-xl p-8 text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">Our support team is ready to assist you.</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@hirenup.com" className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
              <Mail className="w-4 h-4" />
              Send Email
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg border border-primary-200 hover:bg-primary-50 transition">
              <MessageCircle className="w-4 h-4" />
              Live Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
