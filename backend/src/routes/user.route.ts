import { Router } from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// 👤 View own profile
userRouter.get("/me", authenticate, getMyProfile);

export default userRouter;
