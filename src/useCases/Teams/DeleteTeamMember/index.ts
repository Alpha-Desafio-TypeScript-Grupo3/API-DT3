import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { DeleteTeamMemberController } from "./DeleteTeamMemberController";
import { DeleteTeamMemberUseCase } from "./DeleteTeamMemberUseCase";

const postgresTeamRepository = new PostgresTeamRepository();
const postgresUserRepository = new PostgresUserRepository();

const deleteTeamMemberUseCase = new DeleteTeamMemberUseCase(postgresTeamRepository, postgresUserRepository);

const deleteTeamMemberController = new DeleteTeamMemberController(deleteTeamMemberUseCase);

export { deleteTeamMemberUseCase, deleteTeamMemberController };
