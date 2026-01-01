import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { createRoom, joinRoom,getRoomDetails,saveRoomCode,loadRoomCode} from "@/controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/create", authenticate, createRoom);
roomRouter.post("/:roomId", authenticate, joinRoom);
roomRouter.get("/:roomId", authenticate, getRoomDetails);
roomRouter.put("/:roomId/code", authenticate, saveRoomCode);
roomRouter.get("/:roomId/code", authenticate, loadRoomCode);
export default roomRouter;