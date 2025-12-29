import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth",authRouter);
app.use("/user",userRouter);

app.get("/", (req,res)=>{
    res.json({
        message: "Welcome to SyncCode Backend API"
    })
});

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
