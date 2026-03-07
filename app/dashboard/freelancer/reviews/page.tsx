"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Star, User, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  client: string
  clientAvatar?: string
  project: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export default function FreelancerReviewsPage() {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: "1",
        client: "John Smith",
        project: "E-Commerce Website",
        rating: 5,
        comment: "Great work! Delivered on time and exceeded our expectations. We will definitely work together again.",
        date: "February 20, 2026",
        helpful: 12
      },
      {
        id: "2",
        client: "Sarah Johnson",
        project: "Dashboard Redesign",
        rating: 4,
        comment: "Good job, communication could have been a bit better but overall we are satisfied.",
        date: "February 15, 2026",
        helpful: 5
      },
      {
        id: "3",
        client: "Michael Chen",
        project: "API Development",
        rating: 5,
        comment: "Professional approach, excellent technical knowledge. Highly recommended!",
        date: "February 10, 2026",
        helpful: 8
      }
    ]
    
    setTimeout(() => {
      setReviews(mockReviews)
      setLoading(false)
    }, 500)
  }, [])

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0"

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Feedback from your clients</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-green-600">
              {reviews.filter(r => r.rating >= 4).length}
            </p>
            <p className="text-sm text-gray-600">Positive (4+ Stars)</p>
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-500">Reviews will appear here when you complete your first project</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-turquoise-500 flex items-center justify-center text-white font-semibold">
                    {review.client[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.client}</p>
                        <p className="text-sm text-gray-500">{review.project}</p>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
