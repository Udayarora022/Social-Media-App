"use client"

import { useAuth } from "../contexts/AuthContext"
import AuthForm from "./AuthForm"
import Feed from "./Feed"
import Sidebar from "./Sidebar"
import RightSidebar from "./RightSidebar"

export default function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-72 mr-80">
          <Feed />
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  )
}
