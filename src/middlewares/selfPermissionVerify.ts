import { config } from "../config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = config.SECRET_KEY;

//Interface customizada para aceitar novo atributo dentro da request
interface CustomRequest extends Request {
    user?: any;
}
//Esse middleware verifica se o proprio usuário quem está fazendo a solicitação para si, ou se é um admin
export default async function selfPermissionVerify(req: CustomRequest, res: Response, next: NextFunction) {
    const sessionToken = req.cookies.session_id;
    const selfUserId = req.params.user_id;
    if (!sessionToken) {
      return res.status(401).json({ error: "Token JWT ausente" });
    }

    await jwt.verify(sessionToken, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Token JWT inválido" });
      } 

        const userId = decoded.id;
        const isAdmin = decoded.is_admin;

        if (userId == selfUserId || isAdmin) {
          req.user = decoded.is_admin;
          next();
        } else {
          return res.status(403).json({ error: "Permissão de administrador necessária" });
        }
      }
    );
  }
