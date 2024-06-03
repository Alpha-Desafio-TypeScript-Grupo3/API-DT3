import { TeamRepository } from "../../repositories/TeamRepository";
import { CreateTeamController } from "./CreateTeamController";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

const teamRepository = new TeamRepository();

const createTeamUseCase = new CreateTeamUseCase(teamRepository);

const createTeamController = new CreateTeamController(createTeamUseCase);

export { createTeamUseCase, createTeamController };
