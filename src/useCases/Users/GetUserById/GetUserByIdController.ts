import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { IGetUserRequestDTO } from "./GetUserByIdDTO";

export class GetUserByIdController {
  constructor(private getUsersByIdUseCase: GetUserByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.user_id;

      const requestDTO: IGetUserRequestDTO = {
        user_id: userId,
      };

      const result = await this.getUsersByIdUseCase.execute(requestDTO);

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
