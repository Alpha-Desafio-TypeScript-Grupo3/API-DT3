import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  static handle(req: Request, res: Response): void {
      throw new Error('Method not implemented.');
  }
  public constructor(private getUsersUseCase: GetUsersUseCase) {}

  public async handle(req: Request, res: Response) {
    try {
      const result = await this.getUsersUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}