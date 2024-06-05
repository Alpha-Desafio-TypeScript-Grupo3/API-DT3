import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import HttpResponse from '../utils/http_response';
import { ForbiddenException, UnauthorizedException } from '../utils/exceptions';
import { User } from '../entities/User';
import { PostgresTeamRepository } from '../repositories/implementations/PostgresTeamRepository';


// Setando a propriedade user que não existe por padrão na Request
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const SECRET_KEY = config.SECRET_KEY;

async function adminOrLeaderPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionToken: string = req.cookies.session_id;

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
            const isLeader = await postgresTeamRepository.findByLeader(userId);

            if (!isLeader && !decoded.is_admin) {
                const exception = new ForbiddenException('Você não possui permissão para efetuar essa requisição')
                const response = HttpResponse.fromException(exception);

                res.status(response.statusCode).json(response);
                return;
            }
            req.user = decoded;
            next();
        }
    });
}

export default adminOrLeaderPermission;
