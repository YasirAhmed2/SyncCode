import { Server } from "socket.io";
import http from "http";

let io: Server; // exportable reference

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);

      socket.to(roomId).emit("user-joined", { userId });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.to(roomId).emit("code-update", code);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

// getter to use in other modules
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
