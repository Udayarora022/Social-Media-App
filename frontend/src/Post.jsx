"use client"

import { useState } from "react"
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react"

export default function Post({ post, onLike }) {
  const [liking, setLiking] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleLike = async () => {
    if (liking) return

    setLiking(true)
    setLiked(!liked)

    try {
      await onLike(post.id)
    } catch (error) {
      console.error("Error liking post:", error)
      setLiked(liked)
    } finally {
      setLiking(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  return (
    <div className="border-b border-purple-100 p-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 cursor-pointer group">
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-purple-200 shadow-lg group-hover:ring-purple-300 transition-all duration-300">
          {post.author.profilePicture ? (
            <img
              src={post.author.profilePicture || "/placeholder.svg"}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-lg">{post.author.name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Post Content */}
        <div className="flex-1 min-w-0">
          {/* Post Header */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
              {post.author.name}
            </h3>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <span className="text-gray-500 font-medium">@{post.author.name.toLowerCase().replace(/\s+/g, "")}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-300">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Post Text */}
          <div className="mb-4">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-lg">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.imageUrl && (
            <div className="mb-4">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt="Post image"
                className="w-full max-h-96 object-cover rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between max-w-md mt-4">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 p-3 rounded-full transition-all duration-300 group">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">12</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-green-50 p-3 rounded-full transition-all duration-300 group">
              <Repeat2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">8</span>
            </button>

            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 group ${
                liked ? "text-red-500 bg-red-50" : "text-gray-500 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${liked ? "fill-current" : ""}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 group ${
                bookmarked ? "text-yellow-500 bg-yellow-50" : "text-gray-500 hover:text-yellow-500 hover:bg-yellow-50"
              }`}
            >
              <Bookmark
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${bookmarked ? "fill-current" : ""}`}
              />
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 hover:bg-purple-50 p-3 rounded-full transition-all duration-300 group">
              <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
