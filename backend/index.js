import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import chatbotRoute from './routes/chatbot.route.js';
import path from 'path';

dotenv.config();



const allowedOrigins = [
  "https://mychatapp-o5n2.vercel.app/login",  
  "http://localhost:3001"                
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true  
}));








// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}





//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use('/api/chatbot', chatbotRoute);


//








server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
