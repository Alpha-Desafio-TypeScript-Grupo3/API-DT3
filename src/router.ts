import express from "express";
const router = express.Router();

import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import { loginUserController } from "./useCases/Users/LoginUser";
import { logoutUserController } from "./useCases/Users/LogoutUser";

router.use("/users", userRoutes);
router.use("/teams", teamRoutes);

router.post("/login", async (req, res) => {
  return await loginUserController.handle(req, res);
});
router.post("/logout", async (req, res) => {
  return await logoutUserController.handle(req, res);
});

export default router;
