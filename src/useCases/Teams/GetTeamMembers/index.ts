import { TeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { GetTeamMembersController } from "./GetTeamMembersController";
import { GetTeamMembersUseCase } from "./GetTeamMembersUseCase";

const teamRepository = new TeamRepository();

const getTeamMembersUseCase = new GetTeamMembersUseCase(teamRepository);

const getTeamMembersController = new GetTeamMembersController(getTeamMembersUseCase);

export { getTeamMembersUseCase, getTeamMembersController };
