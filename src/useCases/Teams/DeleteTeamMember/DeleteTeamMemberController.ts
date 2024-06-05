import { Request, Response } from "express";
import HttpResponse from "../../utils/http_response";
import { ErrorType } from "../../utils/exceptions";
import { DeleteTeamMemberUseCase } from "../DeleteTeamMember/DeleteTeamMemberUseCase";

export class DeleteTeamMemberController {
    constructor(private deleteTeamMemberUseCase: DeleteTeamMemberUseCase) { }

    async handleDeleteTeamMember(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;
        const user_id = req.params.user_id;

        try {
            const removedMember = await this.deleteTeamMemberUseCase.executeDeleteTeamMember({ team_id, user_id });

            const response = new HttpResponse({
                statusCode: 200,
                data: removedMember,
                message: 'Membro deletado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

