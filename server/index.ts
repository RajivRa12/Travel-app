import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer as createHttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { handleDemo } from "./routes/demo";
import authRoutes from "./routes/auth";
import notificationsRoutes from "./routes/notifications";
import Message from "./models/Message";
import webpush from 'web-push';
import User from './models/User';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelapp";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/auth", authRoutes);
  app.use("/api/notifications", notificationsRoutes);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Create HTTP server and Socket.IO
  const httpServer = createHttpServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected", socket.id);

    // Join a chat room
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // Handle sending a message
    socket.on("send_message", async (data) => {
      // data: { sender, recipient, content, room }
      const { sender, recipient, content, room } = data;
      const message = new Message({ sender, recipient, content, room });
      await message.save();
      io.to(room).emit("receive_message", {
        sender,
        recipient,
        content,
        room,
        timestamp: message.timestamp,
        _id: message._id,
      });
      // Send push notification to recipient
      const userDoc = await User.findOne({ email: recipient });
      if (userDoc && userDoc.pushSubscription) {
        try {
          await webpush.sendNotification(
            userDoc.pushSubscription,
            JSON.stringify({
              title: 'New Chat Message',
              body: content,
              url: `/chat?room=${room}`,
            })
          );
        } catch (err) {
          console.error('Web push error (chat):', err);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected", socket.id);
    });
  });

  // Attach httpServer to app for export
  (app as any).httpServer = httpServer;
  return app;
}
