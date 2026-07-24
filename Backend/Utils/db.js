

import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
  //mongo db connection
  try {
  //console.log(process.env.MONGO_URI);

   await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.log("something went wrong in connecting to database");
    console.log(error);
  }
}

connectDB();

export default connectDB;