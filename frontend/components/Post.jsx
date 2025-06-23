"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export default function Post({ post, onLike }) {
  const [liking, setLiking] = useState(false)

  const handleLike = async () => {
    if (liking) return

    setLiking(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        onLike(post._id, data.likes)
      }
    } catch (error) {
      console.error("Error liking post:", error)
    } finally {
      setLiking(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          {post.author.profilePicture ? (
            <img
              src={post.author.profilePicture || "/placeholder.svg"}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-semibold">{post.author.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.imageUrl && (
        <div className="mb-4">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          disabled={liking}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors disabled:opacity-50"
        >
          <Heart className="w-5 h-5" />
          <span>
            {post.likes} {post.likes === 1 ? "like" : "likes"}
          </span>
        </button>
      </div>
    </div>
  )
}
