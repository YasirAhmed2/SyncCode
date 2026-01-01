import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { createRoom, joinRoom,getRoomDetails } from "@/controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/create", authenticate, createRoom);
roomRouter.post("/:roomId", authenticate, joinRoom);
roomRouter.get("/:roomId", authenticate, getRoomDetails);
export default roomRouter;