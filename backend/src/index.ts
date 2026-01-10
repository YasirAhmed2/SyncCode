import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import roomRouter from "./routes/room.route.js";
import executeRouter from "./routes/execute.route.js";
import cors from "cors";
import { initSocket } from "./socket.js";
import http from "http";
const app=express();
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth",authRouter);
app.use("/execute", executeRouter);
app.use("/user",userRouter);
app.use("/rooms", roomRouter);
app.get("/", (req,res)=>{
    res.json({
        message: "Welcome to SyncCode Backend API"
    })
});
// @ts-ignore
const server = http.createServer(app);

initSocket(server);



app.listen(5000, async()=>{
try {
    await mongoose.connect(process.env.DATABASE_URL);
     // @ts-ignore
    console.log(`Database Connected Successfully`);
} catch (error) {
console.log("Error: ",error);
}
   console.log(`Server is running at http://localhost:5000`);
})
