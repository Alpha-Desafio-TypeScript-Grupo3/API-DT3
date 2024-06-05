import express from "express"
import { getTeamsController } from "../useCases/Teams/GetTeams";
import { createTeamController } from "../useCases/Teams/CreateTeam";
import { getTeamByIdController } from "../useCases/Teams/GetTeamById";
import { getTeamMembersController } from "../useCases/Teams/GetTeamMembers";
import { addTeamMemberController } from "../useCases/Teams/AddTeamMember";
import { updateTeamController } from "../useCases/Teams/UpdateTeam";
import { deleteTeamMemberController } from "../useCases/Teams/DeleteTeamMember";
import { deleteTeamController } from "../useCases/Teams/DeleteTeam";
import adminOrLeaderPermission from "../middlewares/isMemberPermission";
import isMemberPermission from "../middlewares/isMemberPermission";
const router = express.Router()

router.get('/', adminOrLeaderPermission, (req, res) => { return getTeamsController.handleGetAll(req, res) });
router.get('/:team_id', isMemberPermission, (req, res) => { return getTeamByIdController.handleGetById(req, res) });
router.get('/:team_id/members', (req, res) => { return getTeamMembersController.handleGetTeamMembers(req, res) });

router.post('/', (req, res) => { return createTeamController.handleCreate(req, res) });
router.post('/:team_id/member/:user_id', (req, res) => { return addTeamMemberController.handleAddTeamMember(req, res) });

router.patch('/:team_id', (req, res) => { return updateTeamController.handleUpdateTeam(req, res) });

router.delete('/:team_id/member/:user_id', (req, res) => { return deleteTeamMemberController.handleDeleteTeamMember(req, res) });
router.delete('/:team_id', (req, res) => { return deleteTeamController.handleDeleteTeam(req, res) });

export default router;
