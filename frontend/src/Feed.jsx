"use client"

import { useState, useEffect } from "react"
import { postsService } from "../services/posts.js"
import Post from "./Post"
import CreatePost from "./CreatePost"
import { Sparkles, TrendingUp } from "lucide-react"

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("foryou")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const result = await postsService.getAllPosts()
      if (result.success) {
        setPosts(result.posts)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handleLike = async (postId) => {
    try {
      const result = await postsService.likePost(postId)
      if (result.success) {
        setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: result.likes } : post)))
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  return (
    <div className="min-h-screen border-x border-purple-200 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-purple-200 z-10">
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Home
          </h1>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("foryou")}
            className={`flex-1 py-4 text-center font-bold transition-all duration-300 relative ${
              activeTab === "foryou" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>For you</span>
            </div>
            {activeTab === "foryou" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-4 text-center font-bold transition-all duration-300 relative ${
              activeTab === "following" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Following</span>
            </div>
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* Create Post */}
      <CreatePost onPostCreated={handlePostCreated} />

      {/* Posts Feed */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent absolute top-0"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center p-12">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl inline-block">
            <p className="font-medium">{error}</p>
            <button onClick={fetchPosts} className="mt-2 text-purple-500 hover:underline font-bold">
              Try again
            </button>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to SocialApp!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">This is where you'll see posts from people you follow.</p>
          <p className="text-gray-500">Start by creating your first post above! ✨</p>
        </div>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} onLike={handleLike} />)
      )}
    </div>
  )
}
