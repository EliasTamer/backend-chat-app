import express from "express";
import {
  joinRoomController,
  createRoomController,
  getJoinedRooms,
  getAllRoomsController,
} from "../controller/roomController";

const router = express.Router();

router.post("/createRoom", createRoomController);
router.post("/joinRoom", joinRoomController);
router.get("/getJoinedRooms", getJoinedRooms);
router.get("/getAllRooms", getAllRoomsController);

export default router;
