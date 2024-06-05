import { TeamRepository } from "../../repositories/implementations/PostgresTeamRepository";
import { GetTeamByIdController } from "./GetTeamByIdController";
import { GetTeamByIdUseCase } from "./GetTeamByIdUseCase";


const teamRepository = new TeamRepository();

const getTeamByIdUseCase = new GetTeamByIdUseCase(teamRepository);

const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

export { getTeamByIdUseCase, getTeamByIdController };
