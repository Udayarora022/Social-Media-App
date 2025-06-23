"use client"

import { useState } from "react"
import { postsService } from "../services/posts.js"
import { useAuth } from "../contexts/AuthContext"
import { ImageIcon, Smile, Calendar, MapPin, Sparkles } from "lucide-react"

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth()
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError("")

    try {
      const result = await postsService.createPost(content, imageUrl)
      if (result.success) {
        setContent("")
        setImageUrl("")
        onPostCreated(result.post)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-b border-purple-100 p-6 bg-gradient-to-r from-white to-purple-50">
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-purple-200 shadow-lg">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture || "/placeholder.svg"}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-xl">{user?.name?.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Post Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening? Share your thoughts..."
              className="w-full text-xl placeholder-gray-400 border-none resize-none focus:outline-none bg-transparent"
              rows={3}
              maxLength={280}
            />

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full h-64 object-cover rounded-2xl border-2 border-purple-200 shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="mt-2 text-red-500 text-sm hover:underline font-medium"
                >
                  Remove image
                </button>
              </div>
            )}

            {!imageUrl && (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Add image URL (optional)"
                className="w-full mt-3 p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mt-3">{error}</div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-purple-100">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="text-purple-500 hover:bg-purple-100 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-yellow-500 hover:bg-yellow-100 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-100 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <Calendar className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-green-500 hover:bg-green-100 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}>
                    {280 - content.length}
                  </span>
                  <div className="w-8 h-8 relative">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={content.length > 260 ? "#ef4444" : "#8b5cf6"}
                        strokeWidth="2"
                        strokeDasharray={`${(content.length / 280) * 100}, 100`}
                      />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || !content.trim() || content.length > 280}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
