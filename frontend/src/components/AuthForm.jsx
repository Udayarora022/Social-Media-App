"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await signup(formData.name, formData.email, formData.password)
      }

      if (!result.success) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 animate-gradient py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-10 animate-float"></div>
      <div className="fixed top-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="fixed bottom-20 left-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-md w-full space-y-8 animate-scale-in">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back!" : "Join SocialApp"}
            </h2>
            <p className="text-purple-100">
              {isLogin ? "Sign in to continue your journey" : "Create your account and start connecting"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  required
                  className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                name="email"
                type="email"
                required
                className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="form-input w-full pl-10 pr-12 py-3 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 animate-slide-in-up">
                <div className="text-red-100 text-sm text-center">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3 px-6 rounded-xl text-white font-semibold text-lg shadow-lg hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-2"></div>
                  Processing...
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-purple-200 hover:text-white transition-colors font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}