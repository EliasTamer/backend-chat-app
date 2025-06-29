import express from "express";
import {
  signUpController,
  getUsersController,
  loginController
} from "../controller/authController";

const router = express.Router();

router.post("/login", loginController);
router.post("/signUp", signUpController);
router.get("/getUsers", getUsersController);

export default router;
