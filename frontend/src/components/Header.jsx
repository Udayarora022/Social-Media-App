"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import ProfileForm from "./ProfileForm"
import { User, LogOut } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const [showProfileForm, setShowProfileForm] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">SocialApp</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </div>

              <button
                onClick={() => setShowProfileForm(true)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                title="Edit Profile"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
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
