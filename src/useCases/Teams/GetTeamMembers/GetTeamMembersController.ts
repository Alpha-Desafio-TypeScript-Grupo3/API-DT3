import { Request, Response } from "express";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";
import { GetTeamMembersUseCase } from "./GetTeamMembersUseCase";

export class GetTeamMembersController {
    constructor(private getTeamMembersUseCase: GetTeamMembersUseCase) { }

    async handleGetTeamMembers(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;

        try {
            const members = await this.getTeamMembersUseCase.executeGetTeamMembers({ team_id });

            const response = new HttpResponse({
                statusCode: 200,
                data: members,
                message: 'Membros encontrados com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

