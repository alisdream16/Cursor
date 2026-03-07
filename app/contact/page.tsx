"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-primary-100 text-lg">
            Reach out to us with your questions, we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:info@hirenup.com" className="text-primary-600 hover:underline">
                    info@hirenup.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a href="tel:+18001234567" className="text-primary-600 hover:underline">
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Business Ave<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Write your message..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
