"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import ProfileForm from "./ProfileForm"
import { User, LogOut, Sparkles } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const [showProfileForm, setShowProfileForm] = useState(false)

  return (
    <>
      <header className="glass-dark sticky top-0 z-50 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gradient">SocialApp</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="profile-gradient">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-white font-medium hidden sm:block">{user?.name}</span>
              </div>

              <button
                onClick={() => setShowProfileForm(true)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover-lift"
                title="Edit Profile"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={logout}
                className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all duration-300 hover-lift"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showProfileForm && <ProfileForm onClose={() => setShowProfileForm(false)} />}
    </>
  )
}
