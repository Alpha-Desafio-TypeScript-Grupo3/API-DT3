import express from "express";
const router = express.Router();

import userRoutes from './routes/userRoutes'
import teamRoutes from './routes/teamRoutes'

router.use("/user", userRoutes);
router.use("/team", teamRoutes);

export default router;
