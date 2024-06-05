import Router from 'express'
import { Request, Response } from 'express'
import { getUsersController } from '../useCases/Users/GetUsers'
import { getUserByIdController } from '../useCases/Users/GetUserById'
import { createUserController } from '../useCases/Users/CreateUsers'
import { loginUserController } from '../useCases/Users/LoginUser'
import { logoutUserController } from '../useCases/Users/LogoutUser'
import { checkAdmin } from '../middleware/checkAdmin'
import { checkLeader } from '../middleware/checkLeader'

const router = Router()

router.get("/", checkAdmin,(req: Request, res: Response) => {
    return getUsersController.handle(req, res)    
})
router.get("/:user_id", checkLeader,(req: Request, res: Response) => {
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
