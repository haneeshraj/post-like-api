import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/postDB");
    console.log(`MongoDB Connected : ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
}

export { connectDB };
