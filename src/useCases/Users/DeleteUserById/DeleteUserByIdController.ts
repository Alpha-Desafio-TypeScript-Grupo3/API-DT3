import { Request, Response } from "express";
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";

export class DeleteUserByIdController {
  static handle(req: Request, res: Response): void {
      throw new Error('Method not implemented.');
  }
  public constructor(private deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  public async handle(req: Request, res: Response) {
    try {
      const result = await this.deleteUserByIdUseCase.execute(req.params.user_id);

      return res.status(200).json({ message: "User deleted successfully", data: result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}