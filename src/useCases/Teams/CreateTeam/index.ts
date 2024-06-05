import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { CreateTeamController } from "./CreateTeamController";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

const postgresTeamRepository = new PostgresTeamRepository();
const postgresUserRepository = new PostgresUserRepository();

const createTeamUseCase = new CreateTeamUseCase(postgresTeamRepository, postgresUserRepository);

const createTeamController = new CreateTeamController(createTeamUseCase);

export { createTeamUseCase, createTeamController };
