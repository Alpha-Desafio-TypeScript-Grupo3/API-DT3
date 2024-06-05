import { Request, Response } from "express";

export class LogoutUserController {
  public async handle(req: Request, res: Response) {
    if (!req.cookies.session_id) {
      res.status(404).json({ message: "No user is logged" })
      return
    }
    res.clearCookie("session_id");
    res.status(201).json({ message: "Logout successfully" });
  }
}
