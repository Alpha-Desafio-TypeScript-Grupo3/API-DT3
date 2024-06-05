import { TeamRepository } from "../../repositories/implementations/PostgresTeamRepository";
import { AddTeamMemberController } from "./AddTeamMemberController";
import { AddTeamMemberUseCase } from "./AddTeamMemberUseCase";

const teamRepository = new TeamRepository();

const addTeamMemberUseCase = new AddTeamMemberUseCase(teamRepository);

const addTeamMemberController = new AddTeamMemberController(addTeamMemberUseCase);

export { addTeamMemberUseCase, addTeamMemberController };
