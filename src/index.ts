import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import SocketHandler from "./websocket/socketHandler";
import authRoutes from "./routes/authRoutes";

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


const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
