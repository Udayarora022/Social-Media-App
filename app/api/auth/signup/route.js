import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password, name } = await request.json()

    console.log("Signup attempt for:", email)

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db("social_media")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const hashedPassword = hashPassword(password)
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      bio: "",
      profilePicture: "",
      createdAt: new Date(),
    })

    console.log("User created successfully:", result.insertedId)

    const token = generateToken(result.insertedId.toString())

    return NextResponse.json({
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        bio: "",
        profilePicture: "",
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 })
  }
}
