import { Request, Response } from "express";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";

export class UpdateTeamController {
    constructor(private updateTeamUseCase: UpdateTeamUseCase) { }

    async handleUpdateTeam(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;
        const { name, leader } = req.body ?? "";

        try {
            const updatedTeam = await this.updateTeamUseCase.executeUpdateTeam({ team_id, name, leader });

            const response = new HttpResponse({
                statusCode: 200,
                data: updatedTeam,
                message: 'Time atualizado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

