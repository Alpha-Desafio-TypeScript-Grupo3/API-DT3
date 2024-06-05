import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { first_name, last_name, email, password, username, squad, is_admin } = req.body;

    try {
      const user = await this.createUserUseCase.execute({ 
        first_name, 
        last_name, 
        email, 
        password, 
        username, 
        squad, 
        is_admin 
      });

      const { id } = user;
      return res.status(201).json({
        newUser: { id, username, email, first_name, last_name, squad, is_admin },
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}
