import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import roomRoutes from "./routes/roomRoutes";
import SocketHandler from "./websocket/socketHandler";

const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const socketHandler = new SocketHandler(io);

io.on("connection", (socket) => {
  socketHandler.handleConnection(socket);
});

io.on("disconnect", () => {
  console.log("socket closed!");
});

app.get("/status", (req, res) => {
  res.status(201).json({
    status: "OK",
    timestamp: new Date(),
  });
});

app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const message = error.message;

  res.status(500).json({
    Message: message,
    Success: false,
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
