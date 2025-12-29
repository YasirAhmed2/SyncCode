import express from "express";
import { validate } from "@/middlewares/zod.validation.js";
import { signupSchema, loginSchema,forgotPasswordSchema,resetPasswordSchema } from "@/types/zod.types.js";
import { Signup,Signin } from "@/controllers/auth.controller.js";
import { resetPassword,sendOtp,verifyOtp,logoutUser } from "@/controllers/auth.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { verifyEmailOtp } from "@/controllers/auth.controller.js";

const authRouter=express.Router();

authRouter.post("/register", validate(signupSchema), async (req, res) => {
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

authRouter.post("/login", validate(loginSchema), async (req, res) => {
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

authRouter.post("/forgot-password",validate(forgotPasswordSchema) ,sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", authenticate, validate(resetPasswordSchema), resetPassword);
authRouter.post("/verify-email", verifyEmailOtp);
authRouter.post("/logout", logoutUser);

export default authRouter;