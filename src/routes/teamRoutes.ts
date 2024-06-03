import express from "express"
import { getTeamController } from "../useCases/GetTeam";
import { createTeamController } from "../useCases/CreateTeam";
const router = express.Router()

router.get('/', (req, res) => { return getTeamController.handleGetAll(req, res) });
router.get('/:team_id', (req, res) => { return getTeamController.handleGetById(req, res) });

router.post('/', (req, res) => { return createTeamController.handleCreate(req, res) });
// router.put("/:id")
// router.delete("/:id")

export default router;
