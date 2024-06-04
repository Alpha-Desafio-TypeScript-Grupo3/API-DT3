import express from "express";
const router = express.Router();

import userRoutes from './routes/userRoutes'
import teamRoutes from './routes/teamRoutes'

router.use("/users", userRoutes);
router.use("/teams", teamRoutes);

export default router ;
