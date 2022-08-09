import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

const connectMongo = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
