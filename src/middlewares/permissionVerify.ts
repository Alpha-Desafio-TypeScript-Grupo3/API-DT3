import { config } from "../config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = config.SECRET_KEY;

//Interface customizada para aceitar novo atributo dentro da request
interface CustomRequest extends Request {
    user?: any;
}

//Esse middleware faz a verificação do token do usuário, caso ele tenha, permite o acesso aos dados
export default async function permissionVerify (req: CustomRequest, res:Response, next:NextFunction){
    const sessionToken = req.cookies.session_id;
    if(!sessionToken){
        return res.status(401).json({ error: "Token JWT not provided" });
    }

    await jwt.verify(sessionToken, SECRET_KEY, (err: any, decoded: any) => {
        if(err){
            return res.status(401).json({ error: "Token JWT invalid" });
        }else{
            req.user = decoded.id;
            next();
        }
    });
}
