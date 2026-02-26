"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { MessageCircle, Send, Check, X, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatUser {
  id: string
  name: string
  email: string
  status: "online" | "offline"
  lastMessage?: string
  lastMessageTime?: string
  unread?: number
  requestStatus?: "pending" | "accepted" | "none"
}

const mockUsers: ChatUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "online",
    lastMessage: "Thanks for your help!",
    lastMessageTime: "2 min ago",
    unread: 2,
    requestStatus: "accepted"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "offline",
    lastMessage: "Let's schedule a meeting",
    lastMessageTime: "1 hour ago",
    requestStatus: "accepted"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "online",
    requestStatus: "pending"
  },
]

const mockMessages = [
  { id: "1", senderId: "1", content: "Hi! I saw your profile and I'm interested in working with you.", timestamp: "10:30 AM", isMe: false },
  { id: "2", senderId: "me", content: "Hello! Thank you for reaching out. What kind of project do you have in mind?", timestamp: "10:32 AM", isMe: true },
  { id: "3", senderId: "1", content: "I need help with a Next.js project. Do you have experience with it?", timestamp: "10:35 AM", isMe: false },
  { id: "4", senderId: "me", content: "Yes, I have extensive experience with Next.js. When would you like to discuss the details?", timestamp: "10:36 AM", isMe: true },
]

export default function MessagesPage() {
  const { data: session } = useSession()
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"chats" | "requests">("chats")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleAcceptRequest = (userId: string) => {
    console.log("Accepting request from:", userId)
    // API call to accept chat request
  }

  const handleRejectRequest = (userId: string) => {
    console.log("Rejecting request from:", userId)
    // API call to reject chat request
  }

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const chatUsers = filteredUsers.filter(u => u.requestStatus === "accepted")
  const requestUsers = filteredUsers.filter(u => u.requestStatus === "pending")

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-180px)] flex gap-4">
        {/* Users List */}
        <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("chats")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                  activeTab === "chats"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Chats ({chatUsers.length})
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                  activeTab === "requests"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Requests ({requestUsers.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "chats" ? (
              chatUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                chatUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition text-left ${
                      selectedUser?.id === user.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        {user.status === "online" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                          <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                      </div>
                      {user.unread && user.unread > 0 && (
                        <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {user.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )
            ) : (
              requestUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No pending requests</p>
                </div>
              ) : (
                requestUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border-b border-gray-100"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Wants to start a conversation with you
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(user.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(user.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  {selectedUser.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.status}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isMe
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isMe ? "text-primary-100" : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversation selected</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}



