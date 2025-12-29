import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import User  from "../models/user.mongo.js";

export const getMyProfile = async (req:AuthRequest, res:Response) => {
  try {
    // console.log("getMyProfile called with user:", req.user);
    const _id =req.user?.userId;
    console.log("Fetching profile for userId:", _id);
    const user = await User.findById(_id).select(
      "name email iat"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
