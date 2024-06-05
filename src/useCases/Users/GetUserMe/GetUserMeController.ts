import { Request, Response } from "express";
import { GetUserMeUseCase } from "./GetUserMeUseCase";

//Interface customizada para aceitar novo atributo dentro da request
interface CustomRequest extends Request {
  user?: any;
}

export class GetUserMeController {
  constructor(private getUserMeUseCase: GetUserMeUseCase) {}

  async handle(req: CustomRequest, res: Response) {
    try {
      const result = await this.getUserMeUseCase.execute(req.user);

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
