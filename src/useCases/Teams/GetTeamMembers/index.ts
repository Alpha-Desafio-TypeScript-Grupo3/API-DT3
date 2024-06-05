import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { GetTeamMembersController } from "./GetTeamMembersController";
import { GetTeamMembersUseCase } from "./GetTeamMembersUseCase";

const postgresTeamRepository = new PostgresTeamRepository();

const getTeamMembersUseCase = new GetTeamMembersUseCase(postgresTeamRepository);

const getTeamMembersController = new GetTeamMembersController(getTeamMembersUseCase);

export { getTeamMembersUseCase, getTeamMembersController };
