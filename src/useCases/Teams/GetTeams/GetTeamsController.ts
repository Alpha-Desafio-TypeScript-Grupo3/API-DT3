import { Request, Response } from "express";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";
import { GetTeamsUseCase } from "./GetTeamsUseCase";

export class GetTeamsController {
    constructor(private getTeamsUseCase: GetTeamsUseCase) { }

    async handleGetAll(req: Request, res: Response): Promise<Response> {

        try {
            const teams = await this.getTeamsUseCase.executeGetAll();

            const response = new HttpResponse({
                statusCode: 200,
                data: teams,
                message: 'Times encontrados com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

