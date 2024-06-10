import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import HttpResponse from '../utils/http_response';
import { ForbiddenException, UnauthorizedException } from '../utils/exceptions';
import { User } from '../entities/User';
import { PostgresTeamRepository } from '../repositories/implementations/PostgresTeamRepository';
import { PostgresUserRepository } from '../repositories/implementations/PostgresUserRepository';


// Setando a propriedade user que não existe por padrão na Request
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const SECRET_KEY = config.SECRET_KEY;

async function isMemberPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionToken: string = req.cookies.session_id;
    const team_id = req.params.team_id;

    console.log("sesstoken:", sessionToken);

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

            const postgresUserRepository = new PostgresUserRepository();
            const user = await postgresUserRepository.getUserById(decoded.id);

            if (user!.squad !== team_id && !decoded.is_admin) {
                const exception = new ForbiddenException('Você não é membro dessa equipe ou não possui permissão para efetuar essa requisição')
                const response = HttpResponse.fromException(exception);

                res.status(response.statusCode).json(response);
                return;
            }

            req.user = decoded;
            next();
        }
    });
}

export default isMemberPermission;
