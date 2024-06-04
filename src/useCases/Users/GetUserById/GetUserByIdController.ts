import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

export class GetUserByIdController {
  static handle(req: Request, res: Response): void {
      throw new Error('Method not implemented.');
  }
  public constructor(private getUsersByIdUseCase: GetUserByIdUseCase) {}

  public async handle(req: Request, res: Response) {
    try {
      const result = await this.getUsersByIdUseCase.execute(req.params.user_id);

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