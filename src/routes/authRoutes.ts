import express from "express";
import { signUpController, getUsersController } from "../controller/authController";

const router = express.Router();

router.post("/signUp", signUpController);
router.get("/getUsers", getUsersController)

export default router;
