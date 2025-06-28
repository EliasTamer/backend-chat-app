import express from "express";
import {
  joinRoomController,
  createRoomController,
  getJoinedRooms,
} from "../controller/roomController";

const router = express.Router();

router.post("/createRoom", createRoomController);
router.post("/joinRoom", joinRoomController);
router.get("/getJoinedRooms", getJoinedRooms);

export default router;
