import express from "express";
const router = express.Router();

import userRoutes from './userRoutes'
import teamRoutes from './teamRoutes'

router.use("/user", userRoutes);
router.use("/team", teamRoutes);

export default router;
