import Router from 'express'
import { Request, Response } from 'express'
import { getUsersController } from '../useCases/Users/GetUsers'
import { getUserByIdController } from '../useCases/Users/GetUserById'
import { createUserController } from '../useCases/Users/CreateUsers'
import { loginUserController } from '../useCases/Users/LoginUser'
import { logoutUserController } from '../useCases/Users/LogoutUser'

const router = Router()

router.get("/", (req: Request, res: Response) => {
    return getUsersController.handle(req, res)    
})
router.get("/:user_id", (req: Request, res: Response) => {
    return getUserByIdController.handle(req, res)    
})

router.post("/", (req: Request, res: Response) => {
    return createUserController.handle(req,res)
})
router.post("/login", (req: Request, res: Response) => {
    return loginUserController.handle(req,res)
})

router.delete("/logout", (req: Request, res: Response) => {
    return logoutUserController.handle(req,res);
})

export default router ;
