import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { createRoom, joinRoom } from "@/controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/create", authenticate, createRoom);
roomRouter.post("/:roomId", authenticate, joinRoom);
export default roomRouter;