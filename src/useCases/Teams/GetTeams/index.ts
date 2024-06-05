import { TeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { GetTeamsController } from "./GetTeamsController";
import { GetTeamsUseCase } from "./GetTeamsUseCase";

const teamRepository = new TeamRepository();

const getTeamsUseCase = new GetTeamsUseCase(teamRepository);

const getTeamsController = new GetTeamsController(getTeamsUseCase);

export { getTeamsUseCase, getTeamsController };
