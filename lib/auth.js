import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Use environment variable or throw error in production
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required")
}

export function hashPassword(password) {
  try {
    return bcrypt.hashSync(password, 12)
  } catch (error) {
    console.error("Error hashing password:", error)
    throw new Error("Password hashing failed")
  }
}

export function verifyPassword(password, hashedPassword) {
  try {
    return bcrypt.compareSync(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

export function generateToken(userId) {
  try {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
  } catch (error) {
    console.error("Error generating token:", error)
    throw new Error("Token generation failed")
  }
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}
