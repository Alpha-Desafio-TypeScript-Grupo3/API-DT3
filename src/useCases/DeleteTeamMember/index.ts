import { TeamRepository } from "../../repositories/implementations/PostgresTeamRepository";
import { DeleteTeamMemberController } from "./DeleteTeamMemberController";
import { DeleteTeamMemberUseCase } from "./DeleteTeamMemberUseCase";

const teamRepository = new TeamRepository();

const deleteTeamMemberUseCase = new DeleteTeamMemberUseCase(teamRepository);

const deleteTeamMemberController = new DeleteTeamMemberController(deleteTeamMemberUseCase);

export { deleteTeamMemberUseCase, deleteTeamMemberController };
