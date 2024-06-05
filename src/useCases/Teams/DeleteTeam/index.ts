import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { DeleteTeamController } from "./DeleteTeamController";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";

const postgresTeamRepository = new PostgresTeamRepository();
const postgresUserRepository = new PostgresUserRepository

const deleteTeamUseCase = new DeleteTeamUseCase(postgresTeamRepository, postgresUserRepository);

const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);

export { deleteTeamUseCase, deleteTeamController };
