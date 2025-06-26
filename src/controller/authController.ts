import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { db } from "../utils/databaseConnection";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const [result] = await db.query(
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User created", result });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [result] = await db.query("SELECT username, email From Users");
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};
