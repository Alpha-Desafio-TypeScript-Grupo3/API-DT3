import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { DeleteTeamController } from "./DeleteTeamController";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";

const postgresTeamRepository = new PostgresTeamRepository();

const deleteTeamUseCase = new DeleteTeamUseCase(postgresTeamRepository);

const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);

export { deleteTeamUseCase, deleteTeamController };
