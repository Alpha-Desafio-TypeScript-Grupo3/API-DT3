import Router from 'express'
import { Request, Response } from 'express'
import { getUsersController } from '../useCases/Users/GetUsers'
import { getUserByIdController } from '../useCases/Users/GetUserById'
const router = Router()

router.get("/", (req: Request, res: Response) => {
    return getUsersController.handle(req, res)    
})
router.get("/:user_id", (req: Request, res: Response) => {
    return getUserByIdController.handle(req, res)    
})
// router.post("/")
// router.put("/:id")
// router.delete("/:id")

export default router ;
