import mongoose from "mongoose";

interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached: Cached = { conn: null, promise: null };

export const connectToDatabase = async (): Promise<mongoose.Connection> => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  if (!cached.promise) {
    const opts = {
      dbName: "evently",
      bufferCommands: false,
    };

    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
        return mongoose.connection;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
