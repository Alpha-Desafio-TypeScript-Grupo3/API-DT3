import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "./UpdateUserByIdUseCase";


export class UpdateUserByIdController {
  static handle(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }
  public constructor(private updateUserByIdUseCase: UpdateUserByIdUseCase) { }

  public async handle(req: Request, res: Response) {
    const id = req.params.user_id;
    const user = req.body;

    try {
      const result = await this.updateUserByIdUseCase.execute(id, user);

      return res.status(200).json({ message: "User updated successfully", data: result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}