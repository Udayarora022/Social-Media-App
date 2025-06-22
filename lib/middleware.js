import { verifyToken } from "./auth"
import { getMongoClient } from "./mongodb"
import { ObjectId } from "mongodb"

export async function authenticateUser(req) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  const client = await getMongoClient()
  const db = client.db("social_media")
  const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) })

  return user
}
