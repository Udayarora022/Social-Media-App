"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import { postsAPI } from "../services/api"

export default function Post({ post, onLike }) {
  const [liking, setLiking] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    if (liking) return

    setLiking(true)
    setLiked(!liked)
    
    try {
      const response = await postsAPI.likePost(post._id)
      onLike(post._id, response.data.likes)
    } catch (error) {
      console.error("Error liking post:", error)
      setLiked(!liked) // Revert on error
    } finally {
      setLiking(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="card-enhanced rounded-3xl p-6 hover-lift group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="profile-gradient">
            {post.author.profilePicture ? (
              <img
                src={post.author.profilePicture}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="mb-6 animate-scale-in">
          <img
            src={post.imageUrl}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={liking}
            className={`like-button flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              liked 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            } disabled:opacity-50`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">
              {post.likes} {post.likes === 1 ? "like" : "likes"}
            </span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-300">
            <Share className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}