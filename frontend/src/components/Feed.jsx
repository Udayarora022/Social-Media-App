"use client"

import { useState, useEffect } from "react"
import { postsAPI } from "../services/api"
import Post from "./Post"
import CreatePost from "./CreatePost"
import { RefreshCw } from "lucide-react"

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    
    try {
      const response = await postsAPI.getAllPosts()
      setPosts(response.data.posts)
      setError("")
    } catch (err) {
      setError("Failed to load posts")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId, newLikeCount) => {
    setPosts(posts.map((post) => (post._id === postId ? { ...post, likes: newLikeCount } : post)))
  }

  const handleRefresh = () => {
    fetchPosts(true)
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="glass rounded-3xl p-8 animate-pulse-glow">
            <div className="spinner mx-auto mb-4"></div>
            <div className="text-white font-medium">Loading amazing posts...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-enhanced rounded-3xl p-8 text-center animate-scale-in">
          <div className="text-red-500 text-lg font-medium mb-4">Oops! {error}</div>
          <button
            onClick={() => fetchPosts()}
            className="btn-gradient px-6 py-3 rounded-xl text-white font-medium hover-lift"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Refresh Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-3 glass rounded-full text-white hover:bg-white/20 transition-all duration-300 hover-lift disabled:opacity-50"
          title="Refresh posts"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <CreatePost onPostCreated={handlePostCreated} />

      {posts.length === 0 ? (
        <div className="card-enhanced rounded-3xl p-12 text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center opacity-50">
            <span className="text-3xl">✨</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet!</h3>
          <p className="text-gray-600">Be the first to share something amazing with the community.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Post post={post} onLike={handleLike} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
