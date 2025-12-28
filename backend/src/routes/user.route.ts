import express from "express";
import { validate } from "@/middlewares/zod.validation.js";
import { signupSchema, loginSchema,forgotPasswordSchema,resetPasswordSchema } from "@/types/zod.types.js";
import { Signup,Signin } from "@/controllers/user.controller.js";
import { resetPassword,sendOtp,verifyOtp } from "@/controllers/user.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { verifyEmailOtp } from "@/controllers/user.controller.js";

const userRouter=express.Router();

userRouter.post("/register", validate(signupSchema), async (req, res) => {
  const userData = req.body;
  console.log("Registering user with data:", userData);
  const userCreated = await Signup(userData);
  res.cookie("AUTH_JWT", userCreated.signedData, {
    httpOnly: true, 
  });

  res.status(201).json({
    message: "Signup successful. Please verify your email."
  });
});

userRouter.post("/login", validate(loginSchema), async (req, res) => {
  const signInReq = await Signin(req.body);
  if (signInReq == null) {
    res.send({
      error: "User does not exists or password is incorrect",
    });
    return;
  } else {
    res.cookie("AUTH_JWT", signInReq.signedData, {
      httpOnly: true, // This makes the cookie inaccessible to JavaScript
    });

    res.send({
      user: signInReq._id,
      name: signInReq.name,
      email: signInReq.email,
    });
  }
});

userRouter.post("/forgot-password", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", authenticate, resetPassword);
userRouter.post("/verify-email", verifyEmailOtp);


export default userRouter;