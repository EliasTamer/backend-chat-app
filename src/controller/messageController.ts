import { NextFunction, Request, Response } from "express";
import { db } from "../utils/databaseConnection";

export const sendMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { room_id, user_id, message } = req.body;

    const [result] = await db.query(
      "insert into Message (user_id, room_id, message) values(?, ?, ?)",
      [user_id, room_id, message]
    );

    res.status(201).json({ message: "message sent!", data: result });
  } catch (error) {
    next(error);
  }
};
