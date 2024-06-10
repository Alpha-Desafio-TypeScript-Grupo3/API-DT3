import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import HttpResponse from '../utils/http_response';
import { ForbiddenException, UnauthorizedException } from '../utils/exceptions';
import { User } from '../entities/User';
import { PostgresTeamRepository } from '../repositories/implementations/PostgresTeamRepository';
import { IGetTeamByIdRequestDTO } from '../useCases/Teams/GetTeamById/GetTeamByIdDTO';


// Setando a propriedade user que não existe por padrão na Request
// É preferível criar um novo Request e não modificar o original
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const SECRET_KEY = config.SECRET_KEY;

async function adminOrTeamLeaderPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionToken: string = req.cookies.session_id;
    const team_id = req.params.team_id;

    if (!sessionToken) {
        const exception = new UnauthorizedException('Missing JWT token')
        const response = HttpResponse.fromException(exception);

        res.status(response.statusCode).json(response);
        return;
    }

    jwt.verify(sessionToken, SECRET_KEY, async (err: any, decoded: any) => {
        if (err) {
            const exception = new UnauthorizedException('Invalid JWT token')
            const response = HttpResponse.fromException(exception);

            res.status(response.statusCode).json(response);
            return;
        } else {
            const userId: string = decoded.id

            const postgresTeamRepository = new PostgresTeamRepository();
            const team = await postgresTeamRepository.findById({ team_id });

            if (!decoded.is_admin) {

                if (team.leader !== userId) {
                    const exception = new ForbiddenException('Requisição negada, você não é lider dessa equipe')
                    const response = HttpResponse.fromException(exception);

                    res.status(response.statusCode).json(response);
                    return;
                }
            }

            req.user = decoded;
            next();
        }
    });
}

export default adminOrTeamLeaderPermission;
