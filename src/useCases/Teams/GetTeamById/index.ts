import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { GetTeamByIdController } from "./GetTeamByIdController";
import { GetTeamByIdUseCase } from "./GetTeamByIdUseCase";


const postgresTeamRepository = new PostgresTeamRepository();

const getTeamByIdUseCase = new GetTeamByIdUseCase(postgresTeamRepository);

const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

export { getTeamByIdUseCase, getTeamByIdController };
