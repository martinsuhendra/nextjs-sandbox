import mongoose, { Error } from 'mongoose'

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  )
}

let cached = globalThis.mongoose

if (!cached) {
  const cachedObj = { conn: null, promise: null }
  globalThis.mongoose = cachedObj

  cached = globalThis.mongoose
}

const connectMongo = async () => {
  try {
    if (cached.conn) {
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
      }

      cached.promise = mongoose
        .connect(MONGO_URI, opts)
        .then((connectMongoose) => {
          return connectMongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    throw new Error(error as string)
  }
}

export default connectMongo
