import Router from 'express'
import { Request, Response } from 'express'
import { getUsersController } from '../useCases/Users/GetUsers'
import { getUserByIdController } from '../useCases/Users/GetUserById'
import { createUserController } from '../useCases/Users/CreateUser'
import { deleteUserByIdController } from '../useCases/Users/DeleteUserById'
import { updateUserByIdController } from '../useCases/Users/UpdateUserById'
import { loginUserController } from '../useCases/Users/LoginUser'
import { logoutUserController } from '../useCases/Users/LogoutUser'
import permissionVerify from '../middlewares/permissionVerify'
import adminPermissionVerify from '../middlewares/adminPermissionVerify'
import { getUserMeController } from '../useCases/Users/GetUserMe'
import selfPermissionVerify from '../middlewares/selfPermissionVerify'

getUserMeController
const router = Router();

router.get("/", adminPermissionVerify, (req: Request, res: Response) => {
    return getUsersController.handle(req, res)
})
router.get("/me", permissionVerify, (req: Request, res: Response) => {
    return getUserMeController.handle(req, res)
})
router.get("/:user_id", adminPermissionVerify, (req: Request, res: Response) => {
    return getUserByIdController.handle(req, res)
})
router.post("/", (req: Request, res: Response) => {
    return createUserController.handle(req, res)
})
router.post("/login", (req: Request, res: Response) => {
    return loginUserController.handle(req, res)
})
router.patch("/:user_id", selfPermissionVerify, (req: Request, res: Response) => {
    return updateUserByIdController.handle(req, res)
})
router.delete("/logout", (req: Request, res: Response) => {
    return logoutUserController.handle(req, res)
})
router.delete("/:user_id", adminPermissionVerify, (req: Request, res: Response) => {
    return deleteUserByIdController.handle(req, res)
})

export default router;
