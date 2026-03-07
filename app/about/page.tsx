"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Zap, Globe, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Platform That Connects Professionals
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            HireNUp is an innovative platform where freelancers, companies, and employees 
            come together, collaborate, and grow together.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-4">
              To provide the easiest way to connect and collaborate in the business world. 
              We help everyone realize their potential by matching talented professionals 
              with the right opportunities.
            </p>
            <p className="text-gray-600 text-lg">
              We are transforming the way you work by combining the best features of 
              Upwork, LinkedIn, Fiverr, and Odoo into a single platform.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">5K+</div>
                <div className="text-gray-600">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">2K+</div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">98%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community First",
                desc: "We prioritize our users' needs in every decision we make."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Transparency",
                desc: "We build trust through open and honest communication."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Innovation",
                desc: "We work to continuously improve and offer new solutions."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Perspective",
                desc: "We bring together talent from all over the world."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Quality",
                desc: "We aim to provide service at the highest standards."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion",
                desc: "We love what we do and this passion reflects in everything."
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Started Today</h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of professionals and discover opportunities.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
