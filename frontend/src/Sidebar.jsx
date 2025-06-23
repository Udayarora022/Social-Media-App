"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Home, Search, Bell, Mail, Bookmark, User, Settings, LogOut, Plus } from "lucide-react"

export default function Sidebar() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("home")

  const menuItems = [
    { id: "home", icon: Home, label: "Home", active: true },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "notifications", icon: Bell, label: "Notifications", badge: 3 },
    { id: "messages", icon: Mail, label: "Messages", badge: 5 },
    { id: "bookmarks", icon: Bookmark, label: "Bookmarks" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            SocialApp
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left transition-all duration-300 mb-2 group ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 shadow-lg"
                  : "hover:bg-white/10 hover:scale-105"
              }`}
            >
              <div className="flex items-center space-x-4">
                <Icon className={`w-6 h-6 ${activeTab === item.id ? "text-pink-400" : "text-white/80"}`} />
                <span className={`text-lg font-medium ${activeTab === item.id ? "text-white" : "text-white/80"}`}>
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        {/* Post Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-4 px-6 rounded-2xl mt-6 hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Create Post</span>
        </button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center justify-between bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center ring-2 ring-white/30">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">{user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{user?.name}</p>
              <p className="text-white/60 text-sm truncate">@{user?.email?.split("@")[0]}</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 hover:bg-red-500/20 rounded-full transition-colors" title="Logout">
            <LogOut className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
