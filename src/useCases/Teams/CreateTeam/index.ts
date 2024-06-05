import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { CreateTeamController } from "./CreateTeamController";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

const postgresTeamRepository = new PostgresTeamRepository();

const createTeamUseCase = new CreateTeamUseCase(postgresTeamRepository);

const createTeamController = new CreateTeamController(createTeamUseCase);

export { createTeamUseCase, createTeamController };
