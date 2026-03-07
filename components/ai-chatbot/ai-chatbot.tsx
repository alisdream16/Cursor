"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm your AI assistant. How can I help you today? I can answer questions about HireNUp, help you find freelancers, jobs, or guide you through our platform.",
    timestamp: new Date()
  }
]

const quickQuestions = [
  "How do I find freelancers?",
  "How to post a job?",
  "What are the pricing plans?",
  "How does payment work?"
]

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("freelancer") || lowerMessage.includes("find talent")) {
      return "To find freelancers, go to our 'Find Talent' page from the main menu. You can search by skills, location, and hourly rate. Each freelancer has a profile with their portfolio, reviews, and availability status."
    }
    
    if (lowerMessage.includes("job") || lowerMessage.includes("post")) {
      return "To post a job, first sign in as a Company. Then go to Dashboard > Job Listings > Create New. Fill in the job details, required skills, budget, and timeline. Your job will be visible to freelancers after posting."
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
      return "HireNUp offers 3 plans:\n\n• Silver (Free): 15% commission, basic features\n• Gold ($29/mo): 5% commission, priority support\n• Platinum ($99/mo): 0% commission, all features\n\nYour first month is completely FREE on any plan!"
    }
    
    if (lowerMessage.includes("payment") || lowerMessage.includes("pay")) {
      return "Payments on HireNUp are secure and protected. Clients fund projects upfront, and funds are held in escrow until milestones are approved. Freelancers can withdraw earnings via bank transfer, PayPal, or crypto. Commission rates vary by plan."
    }
    
    if (lowerMessage.includes("account") || lowerMessage.includes("sign up") || lowerMessage.includes("register")) {
      return "Creating an account is free and easy! Click 'Get Started' on our homepage, choose your account type (Freelancer, Company, or Employee), and fill in your details. You'll get full access to all features for your first month!"
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return "Need more help? Here are your options:\n\n• Email: support@hirenup.com\n• Phone: +1 (800) 123-4567\n• Help Center: Visit /help for FAQs\n• Live Chat: Available Mon-Fri 9AM-6PM EST"
    }
    
    return "Thanks for your question! I can help you with:\n\n• Finding freelancers or jobs\n• Posting job listings\n• Understanding pricing plans\n• Payment and security\n• Account setup\n\nWhat would you like to know more about?"
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            {/* Speech Bubble */}
            <div className="absolute -top-16 -left-32 bg-primary-500 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              I'm here for all your questions!
            </div>
            
            {/* Robot Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-4 border-white">
              <Bot className="w-8 h-8 text-white" />
            </div>
            
            {/* Online Indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={cn(
            "fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300",
            isMinimized ? "w-80 h-16" : "w-96 h-[32rem]"
          )}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-white" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-white" />
                )}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                        message.role === "user"
                          ? "bg-primary-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-gray-100 bg-white">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
