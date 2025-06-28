import express from "express";
import { sendMessageController } from "../controller/messageController";

const router = express.Router();

router.post("/sendMessage", sendMessageController);

export default router;
