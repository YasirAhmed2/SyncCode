import { Server, Socket } from "socket.io";
import http from "http";
import Room from "./models/room.mongo.js";
import Chat from "./models/chat.mongo.js";

interface JoinRoomPayload {
  roomId: string;
  userId: string;
}

interface ChatPayload {
  roomId: string;
  userId: string;
  message: string;
}

interface CodePayload {
  roomId: string;
  code: string;
}

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("🔌 Socket connected:", socket.id);

    /* =========================
       JOIN ROOM
    ========================== */
    socket.on("join-room", async ({ roomId, userId }: JoinRoomPayload) => {
      if (!roomId || !userId) return;

      socket.join(roomId);
      socket.data.roomId = roomId;
      socket.data.userId = userId;

      // Add participant (avoid duplicates)
      await Room.findOneAndUpdate(
        { roomId },
        { $addToSet: { participants: userId } },
        { upsert: true }
      );

      const room = await Room.findOne({ roomId })
        .populate("participants", "name email");

      io.to(roomId).emit("participants-update", room?.participants);

      console.log(`👤 User ${userId} joined room ${roomId}`);
    });

    /* =========================
       REAL-TIME CHAT
    ========================== */
    socket.on("send-message", async ({ roomId, userId, message }: ChatPayload) => {
      if (!roomId || !userId || !message) return;

      // Ensure sender is in room
      const room = await Room.findOne({ roomId, participants: userId });
      if (!room) return;

      const chat = await Chat.create({
        roomId,
        sender: userId,
        message,
      });

      const populatedMessage = await chat.populate("sender", "name email");

      io.to(roomId).emit("new-message", populatedMessage);
    });

    /* =========================
       REAL-TIME CODE SYNC
       (FULL TEXT SYNC – SAFE)
    ========================== */
    socket.on("code-change", ({ roomId, code }: CodePayload) => {
      if (!roomId || typeof code !== "string") return;

      // Broadcast to everyone except sender
      socket.to(roomId).emit("code-update", code);
    });

    /* =========================
       DISCONNECT
    ========================== */
    socket.on("disconnect", async () => {
      const { roomId, userId } = socket.data;
      if (!roomId || !userId) return;

      await Room.findOneAndUpdate(
        { roomId },
        { $pull: { participants: userId } }
      );

      const room = await Room.findOne({ roomId })
        .populate("participants", "name email");

      io.to(roomId).emit("participants-update", room?.participants);

      console.log(`❌ User ${userId} left room ${roomId}`);
    });
  });

  console.log("🚀 Socket.IO initialized");
};
