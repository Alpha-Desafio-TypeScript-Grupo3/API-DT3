import { Request, Response } from "express";
import { GetTeamByIdUseCase } from "./GetTeamByIdUseCase";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";

export class GetTeamByIdController {
    constructor(private getTeamByIdUseCase: GetTeamByIdUseCase) { }

    async handleGetById(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;

        try {
            const team = await this.getTeamByIdUseCase.executeGetById({team_id});

            const response = new HttpResponse({
                statusCode: 200,
                data: team,
                message: 'Time encontrado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err: any) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

