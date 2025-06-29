import { db } from "../utils/databaseConnection";
import { Request, Response, NextFunction } from "express";

export const createRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, created_by } = req.body;

    const [result] = await db.query(
      `insert into Room (name, description, created_by) values (?, ?, ?)`,
      [name, description, created_by]
    );

    res
      .status(201)
      .json({ message: "room has been created successfuly!", data: result });
  } catch (error) {
    next(error);
  }
};

export const joinRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, room_id } = req.body;

    const [result] = await db.query(
      `insert into UserChatRooms (user_id, room_id) values(?, ?)`,
      [user_id, room_id]
    );

    res.status(201).json({
      data: result,
      message: `user ${user_id} has joined room: ${room_id}!`,
    });
  } catch (error) {
    next(error);
  }
};

export const getJoinedRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    const [result] = await db.query(
      `select room_id from UserChatRooms where user_id = ?`,
      [user_id]
    );

    res
      .status(201)
      .json({ message: "user rooms fetched successfuly!", data: result });
  } catch (error) {
    next(error);
  }
};

export const getAllRoomsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [result] = await db.query(`select * from Room`);

    res
      .status(201)
      .json({ message: "rooms fetched successfuly!", data: result });
  } catch (error) {
    next(error);
  }
};
