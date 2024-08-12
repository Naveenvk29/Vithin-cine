import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectedDB = async () => {
  try {
    const connectionInfo = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`Connected to MongoDB: ${connectionInfo.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

export default connectedDB;
