import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
   try {
        const databaseConnected = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected !!");  
   }
   catch (error) {
        console.log(`MongoDB connection failed: ${error}`);
   } 
}

export default connectDB;