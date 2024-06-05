import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { AddTeamMemberController } from "./AddTeamMemberController";
import { AddTeamMemberUseCase } from "./AddTeamMemberUseCase";

const postgresTeamRepository = new PostgresTeamRepository();
const postgresUserRepository = new PostgresUserRepository();

const addTeamMemberUseCase = new AddTeamMemberUseCase(postgresTeamRepository, postgresUserRepository);

const addTeamMemberController = new AddTeamMemberController(addTeamMemberUseCase);

export { addTeamMemberUseCase, addTeamMemberController };
