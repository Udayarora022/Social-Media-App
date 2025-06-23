"use client"

import { AuthProvider, useAuth } from "./contexts/AuthContext"
import AuthForm from "./components/AuthForm"
import Feed from "./components/Feed"
import Header from "./components/Header"
import "./index.css"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <div className="glass rounded-3xl p-8 animate-pulse-glow">
          <div className="spinner mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Loading your experience...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 animate-gradient">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8 animate-slide-in-up">
        <Feed />
      </main>
      
      {/* Floating background elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
      <div className="fixed top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="fixed bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
