"use client"

import { useState } from "react"
import { postsAPI } from "../services/api"
import { Image, Send, X } from "lucide-react"

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [showImageInput, setShowImageInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await postsAPI.createPost({ content, imageUrl })
      setContent("")
      setImageUrl("")
      setShowImageInput(false)
      onPostCreated(response.data.post)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-enhanced rounded-3xl p-6 animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's inspiring you today? ✨"
            className="form-input w-full px-4 py-4 rounded-2xl resize-none text-gray-800 placeholder-gray-500 text-lg focus:outline-none min-h-[100px]"
            required
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {content.length}/280
          </div>
        </div>

        {showImageInput && (
          <div className="relative animate-slide-in-up">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL here..."
              className="form-input w-full px-4 py-3 pr-10 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setShowImageInput(false)
                setImageUrl("")
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {imageUrl && (
          <div className="relative animate-slide-in-up">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-h-60 object-cover rounded-2xl"
              onError={() => setImageUrl("")}
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-3 animate-slide-in-up">
            <div className="text-red-600 text-sm">{error}</div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors hover-lift"
          >
            <Image className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Add Image</span>
          </button>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="btn-gradient flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="spinner w-4 h-4"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
