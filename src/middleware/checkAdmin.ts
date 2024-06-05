import jwt from "jsonwebtoken";
import { config } from "../config";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./autenticate";


export const checkAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.session_id;

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;

    if (!req.user.user_id) {
      res.status(403).json({ message: "Not Allowed" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
