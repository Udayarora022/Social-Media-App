import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { authenticateUser } from "@/lib/middleware"
import { ObjectId } from "mongodb"

export async function POST(request, { params }) {
  try {
    const user = await authenticateUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    const client = await getMongoClient()
    const db = client.db("social_media")

    await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } })

    const updatedPost = await db.collection("posts").findOne({ _id: new ObjectId(id) })

    return NextResponse.json({ likes: updatedPost.likes })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
