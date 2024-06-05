import { Request, Response } from "express";
import { CreateTeamUseCase } from "./CreateTeamUseCase";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";

export class CreateTeamController {
    constructor(private createTeamUseCase: CreateTeamUseCase) { }

    async handleCreate(req: Request, res: Response): Promise<Response> {
        const { leader, name } = req.body;

        try {
            const createdTeam = await this.createTeamUseCase.execute({ leader, name });

            console.log("controller:", createdTeam);

            const response = new HttpResponse({
                statusCode: 201,
                data: createdTeam,
                message: 'Time criado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err: any) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);

        }
    }
}
