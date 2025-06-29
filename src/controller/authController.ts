import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
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
      "INSERT INTO User (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User created", result });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const [result] = await db.query("SELECT * from User where email = ?", [
      email,
    ]);

    if (result.length === 0) {
      const error = new Error("Email not found!");
      throw error;
    }

    const match = await bcrypt.compare(password, result[0].password_hash);

    if (!match) {
      const error = new Error("Password doesn't match!");
      throw error;
    }

    res.status(201).json({
      message: "Login succesful!",
      data: {
        id: result[0].id,
        email: result[0].email,
        username: result[0].username,
      },
    });
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
    const [result] = await db.query("SELECT id, username, email From User");
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};
