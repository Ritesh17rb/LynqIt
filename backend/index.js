import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";
import { socketHandler } from "./socket.js";
import logger from "./utils/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Allow ALL origins for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

// Attach io instance to app
app.set("io", io);

// ✅ Allow ALL origins for Express
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined", { stream: logger.stream }));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// ✅ Socket setup
socketHandler(io);

// ✅ Root route for health check
app.get("/", (req, res) => {
  res.status(200).send("✅ LynqIt backend is running successfully 🚀");
});

// ✅ Error handling
app.use(errorHandler);

// ✅ 404 handler (important: put this AFTER all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
});

// ✅ Global error safety
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION 💥 Shutting down...", err);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION 💥 Shutting down...", err);
  process.exit(1);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

// 🩵 IMPORTANT for Render: use "0.0.0.0" host so it binds publicly
server.listen(PORT, "0.0.0.0", async () => {
  try {
    await connectDb();
    logger.info(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    logger.error("❌ Database connection failed", err);
    process.exit(1);
  }
});
