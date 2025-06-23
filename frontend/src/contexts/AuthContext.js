"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/auth.js"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const result = await authService.getCurrentUser()
      if (result.success) {
        setUser(result.user)
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const result = await authService.login(email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const signup = async (name, email, password) => {
    const result = await authService.signup(name, email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateProfile = async (profileData) => {
    const result = await authService.updateProfile(profileData)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
