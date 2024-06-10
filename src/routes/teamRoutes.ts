import express from "express"

import { getTeamsController } from "../useCases/Teams/GetTeams";
import { getTeamByIdController } from "../useCases/Teams/GetTeamById";
import { getTeamMembersController } from "../useCases/Teams/GetTeamMembers";
import { createTeamController } from "../useCases/Teams/CreateTeam";
import { addTeamMemberController } from "../useCases/Teams/AddTeamMember";
import { updateTeamController } from "../useCases/Teams/UpdateTeam";
import { deleteTeamMemberController } from "../useCases/Teams/DeleteTeamMember";
import { deleteTeamController } from "../useCases/Teams/DeleteTeam";

import isMemberPermission from "../middlewares/isMemberPermission";
import adminPermissionVerify from "../middlewares/adminPermissionVerify";
import adminOrAnyLeaderPermission from "../middlewares/adminOrAnyLeaderPermission";
import adminOrTeamLeaderPermission from "../middlewares/adminOrTeamLeaderPermission";

const router = express.Router()

router.get('/', adminOrAnyLeaderPermission, (req, res) => { return getTeamsController.handleGetAll(req, res) });
router.get('/:team_id', isMemberPermission, (req, res) => { return getTeamByIdController.handleGetById(req, res) });
router.get('/:team_id/members', isMemberPermission, (req, res) => { return getTeamMembersController.handleGetTeamMembers(req, res) });

router.post('/', adminPermissionVerify, (req, res) => { return createTeamController.handleCreate(req, res) });
router.post('/:team_id/member/:user_id', adminOrTeamLeaderPermission, (req, res) => { return addTeamMemberController.handleAddTeamMember(req, res) });

router.patch('/:team_id', adminOrTeamLeaderPermission, (req, res) => { return updateTeamController.handleUpdateTeam(req, res) });

router.delete('/:team_id/member/:user_id', adminOrTeamLeaderPermission, (req, res) => { return deleteTeamMemberController.handleDeleteTeamMember(req, res) });
router.delete('/:team_id', adminPermissionVerify, (req, res) => { return deleteTeamController.handleDeleteTeam(req, res) });

export default router;
