import { TeamRepository } from "../../repositories/implementations/PostgresTeamRepository";
import { DeleteTeamController } from "./DeleteTeamController";
import { DeleteTeamUseCase } from "./DeleteTeamUseCase";

const teamRepository = new TeamRepository();

const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository);

const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);

export { deleteTeamUseCase, deleteTeamController };
