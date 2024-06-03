import { Request, Response } from "express";
import { GetTeamUseCase } from "./GetTeamUseCase";
import HttpResponse from "../../utils/http_response";
import { ErrorType } from "../../utils/exceptions";

export class GetTeamController {
    constructor(private getTeamUseCase: GetTeamUseCase) { }

    async handleGetAll(req: Request, res: Response): Promise<Response> {

        try {
            const teams = await this.getTeamUseCase.executeGetAll();

            const response = new HttpResponse({
                statusCode: 200,
                data: teams,
                message: ''
            });

            return res.status(response.statusCode).json(response);

            //Sem utilizar um módulo de tipagem pro retorno
            //return response.status(200).json(teams);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);

            //return res.status(400).json({ message: err.message || 'Unexpected error.' })
        }
    }

    async handleGetById(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;

        try {
            const team = await this.getTeamUseCase.executeGetById(team_id);

            const response = new HttpResponse({
                statusCode: 200,
                data: team,
                message: ''
            });

            return res.status(response.statusCode).json(response);
        } catch (err: any) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);

            //return res.status(400).json({ message: err.message || 'Unexpected error.' })
        }
    }
}

