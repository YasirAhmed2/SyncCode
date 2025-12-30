import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { createRoom } from "@/controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/create", authenticate, createRoom);

export default roomRouter;