import { config } from '../config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = config.SECRET_KEY;

interface CustomRequest extends Request {
    user?: any;
}

// Esse middleware verifica se o usuário tem permissão de "admin", caso ele tenha, permite o acesso
export default async function adminPermissionVerify(req: CustomRequest, res: Response, next: NextFunction) {
    const sessionToken = req.cookies.session_id;
    if (!sessionToken) {
        return res.status(401).json({ error: "Token JWT not provided" });
    }

    await jwt.verify(sessionToken, SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: "Token JWT invalid" });
        }

        if (decoded) {
            const isAdmin = decoded.is_admin;
            if (!isAdmin) {
                return res.status(403).json({ error: "Administrator permission necessary" });
            }
            req.user = decoded.user;
            next();
        } else {
            return res.status(403).json({ error: "Token JWT invalid" });
        }
    });
}
