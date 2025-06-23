"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { User, FileText, Image, X, Save } from "lucide-react"

export default function ProfileForm({ onClose }) {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await updateProfile(formData)
      if (result.success) {
        onClose()
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Picture Preview */}
          {formData.profilePicture && (
            <div className="flex justify-center mb-6">
              <div className="profile-gradient">
                <img
                  src={formData.profilePicture}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover"
                  onError={() => setFormData({ ...formData, profilePicture: "" })}
                />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Bio Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="form-input w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none resize-none"
                placeholder="Tell us about yourself... ✨"
              />
              <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                {formData.bio.length}/150
              </div>
            </div>

            {/* Profile Picture URL Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">
                <Image className="w-4 h-4 inline mr-2" />
                Profile Picture URL
              </label>
              <input
                type="url"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-3 animate-slide-in-up">
                <div className="text-red-200 text-sm">{error}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-gradient flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl text-white font-semibold hover-lift disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="spinner w-4 h-4"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-2xl hover:bg-white/20 focus:outline-none transition-all duration-300 font-semibold hover-lift"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}