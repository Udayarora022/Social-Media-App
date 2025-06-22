import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    console.log("Login attempt for:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db("social_media")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValidPassword = verifyPassword(password, user.password)
    if (!isValidPassword) {
      console.log("Invalid password for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("Login successful for:", email)

    const token = generateToken(user._id.toString())

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 })
  }
}
