import { TeamRepository } from "../../repositories/TeamRepository";
import { GetTeamController } from "./GetTeamController";
import { GetTeamUseCase } from "./GetTeamUseCase";

const teamRepository = new TeamRepository();

const getTeamUseCase = new GetTeamUseCase(teamRepository);

const getTeamController = new GetTeamController(getTeamUseCase);

export { getTeamUseCase, getTeamController };
