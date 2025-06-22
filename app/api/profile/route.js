import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { authenticateUser } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export async function GET(request) {
  try {
    const user = await authenticateUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const user = await authenticateUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, bio, profilePicture } = await request.json()

    const client = await getMongoClient()
    const db = client.db("social_media")

    await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          name: name || user.name,
          bio: bio || user.bio,
          profilePicture: profilePicture || user.profilePicture,
        },
      },
    )

    const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(user._id) })

    return NextResponse.json({
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
