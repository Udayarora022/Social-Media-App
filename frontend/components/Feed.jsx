"use client"

import { useState, useEffect } from "react"
import Post from "./Post"
import CreatePost from "./CreatePost"

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()

      if (response.ok) {
        setPosts(data.posts)
      } else {
        setError(data.error)
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

  const handleLike = (postId, newLikeCount) => {
    setPosts(posts.map((post) => (post._id === postId ? { ...post, likes: newLikeCount } : post)))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">Error: {error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No posts yet. Be the first to share something!</div>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} onLike={handleLike} />)
      )}
    </div>
  )
}
