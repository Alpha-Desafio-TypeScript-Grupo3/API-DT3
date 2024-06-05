import { Request, Response } from "express";
import HttpResponse from "../../../utils/http_response";
import { ErrorType } from "../../../utils/exceptions";
import { AddTeamMemberUseCase } from "./AddTeamMemberUseCase";

export class AddTeamMemberController {
    constructor(private addTeamMemberUseCase: AddTeamMemberUseCase) { }

    async handleAddTeamMember(req: Request, res: Response): Promise<Response> {
        const team_id = req.params.team_id;
        const user_id = req.params.user_id;

        try {
            const addedMember = await this.addTeamMemberUseCase.executeAddTeamMember({ team_id, user_id });

            const response = new HttpResponse({
                statusCode: 200,
                data: addedMember,
                message: 'Membro adicionado com sucesso!'
            });

            return res.status(response.statusCode).json(response);
        } catch (err) {

            const typedError = err as { statusCode: number; error: ErrorType; message: string };
            const response = HttpResponse.fromException(typedError);
            return res.status(response.statusCode).json(response);
        }
    }
}

