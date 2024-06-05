import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { GetTeamsController } from "./GetTeamsController";
import { GetTeamsUseCase } from "./GetTeamsUseCase";

const postgresTeamRepository = new PostgresTeamRepository();

const getTeamsUseCase = new GetTeamsUseCase(postgresTeamRepository);

const getTeamsController = new GetTeamsController(getTeamsUseCase);

export { getTeamsUseCase, getTeamsController };
