import { Request, Response } from "express";
import HttpResponse from "../../utils/http_response";
import { ErrorType } from "../../utils/exceptions";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";

export class DeleteTeamController {
    constructor(private deleteTeamUseCase: DeleteTeamUseCase) { }

    async handleDeleteTeam(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;

        try {
            const deletedTeam = await this.deleteTeamUseCase.executeDeleteTeam({ team_id });

            const response = new HttpResponse({
                statusCode: 200,
                data: deletedTeam,
                message: 'Time deletado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

