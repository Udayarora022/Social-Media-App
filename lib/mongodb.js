import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const options = {}

let cached = global._mongo
if (!cached) {
  cached = global._mongo = { client: null, promise: null }
}


export async function getMongoClient() {
  if (!uri) {
    throw new Error("The MONGODB_URI environment variable is not set.")
  }

  if (cached.client) {
    return cached.client
  }
  if (!cached.promise) {
    cached.promise = new MongoClient(uri, options).connect()
  }
  cached.client = await cached.promise
  return cached.client
}
