import { Response } from "express";
import Room from "@/models/room.mongo.js";
import { AuthRequest } from "@/middlewares/auth.middleware.js";
import { generateRoomId } from "@/utils/roomId.utils.js";

export const createRoom = async (req, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { language } = req.body;

    const room = await Room.create({
      roomId: generateRoomId(),
      createdBy: userId,
      participants: [userId],
      language: language || "javascript",
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: {
        roomId: room.roomId,
        createdBy: room.createdBy,
        language: room.language,
      },
    });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const joinRoom = async (req, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { roomId } = req.params;
console.log("Room ID:", roomId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Prevent duplicate join
    if (room.participants.includes(userId)) {
      return res.status(400).json({ message: "User already joined room" });
    }

    room.participants.push(userId);
    await room.save();

    res.status(200).json({
      success: true,
      message: "Joined room successfully",
      room: {
        roomId: room.roomId,
        participantsCount: room.participants.length,
        language: room.language,
      },
    });
  } catch (error) {
    console.error("Join room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
