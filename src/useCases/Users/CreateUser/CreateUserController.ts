import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserController {
  static handle(req: Request, res: Response): void {
      throw new Error('Method not implemented.');
  }
  public constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(req: Request, res: Response) {
    const user: ICreateUserRequestDTO = req.body;
    try {
      const result = await this.createUserUseCase.execute(user);

      return res.status(200).json({ message: "User created successfully", data: result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}