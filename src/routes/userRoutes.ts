import Router from 'express'
import { Request, Response } from 'express'
import { getUsersController } from '../useCases/Users/GetUsers'
import { getUserByIdController } from '../useCases/Users/GetUserById'
import { createUserController } from '../useCases/Users/CreateUser'
import { deleteUserByIdController } from '../useCases/Users/DeleteUserById'
import { updateUserByIdController } from '../useCases/Users/UpdateUserById'
const router = Router()

router.get("/", (req: Request, res: Response) => {
    return getUsersController.handle(req, res)    
})
router.get("/:user_id", (req: Request, res: Response) => {
    return getUserByIdController.handle(req, res)    
})
router.post("/", (req: Request, res: Response) => {
    return createUserController.handle(req, res)
})
router.patch("/:user_id", (req: Request, res: Response) => {
    return updateUserByIdController.handle(req, res)    
})
router.delete("/:user_id", (req: Request, res: Response) => {
    return deleteUserByIdController.handle(req, res)    
})
// router.post("/")
// router.put("/:id")
// router.delete("/:id")

export default router;
