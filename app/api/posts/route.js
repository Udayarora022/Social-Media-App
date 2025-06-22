import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { authenticateUser } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await getMongoClient()
    const db = client.db("social_media")

    const posts = await db
      .collection("posts")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            _id: 1,
            content: 1,
            imageUrl: 1,
            likes: 1,
            createdAt: 1,
            "author.name": 1,
            "author.profilePicture": 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray()

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = await authenticateUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, imageUrl } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db("social_media")

    const result = await db.collection("posts").insertOne({
      userId: new ObjectId(user._id),
      content,
      imageUrl: imageUrl || "",
      likes: 0,
      createdAt: new Date(),
    })

    const newPost = await db
      .collection("posts")
      .aggregate([
        {
          $match: { _id: result.insertedId },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            _id: 1,
            content: 1,
            imageUrl: 1,
            likes: 1,
            createdAt: 1,
            "author.name": 1,
            "author.profilePicture": 1,
          },
        },
      ])
      .toArray()

    return NextResponse.json({ post: newPost[0] })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
