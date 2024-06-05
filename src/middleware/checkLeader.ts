import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./autenticate";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { PostgresUserRepository } from "../repositories/implementations/PostgresUserRepository";

export const checkLeader = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.session_id;

  const decoded = jwt.verify(token, config.SECRET_KEY);
  req.user = decoded;

  try {
    const DB = new PostgresUserRepository();
    const isLeader = await DB.findIfUserIsLeader(req.user.id);

    if (!isLeader) {
      res.status(403).json({ message: "Not Allowed" });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
        res.status(403).json(error.message)
    }
    else {
        res.status(400).json(error)
    }
  }
};
