import express from "express";
import dotenv from "dotenv";
dotenv.config();
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

const app = express();
const server = http.createServer(app);

// ✅ Allowed Origins (Use '*' in development only)
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://lynq-it.vercel.app"]
    : ["http://localhost:5173"];

// ✅ Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// ✅ Attach io instance to app (so you can access it from routes/controllers)
app.set("io", io);

// ✅ Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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

// ✅ 404 handler
app.use((req, res, next) => {
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
const port = process.env.PORT || 5000;
server.listen(port, async () => {
  await connectDb();
  logger.info(`🚀 Server running on port ${port}`);
});
