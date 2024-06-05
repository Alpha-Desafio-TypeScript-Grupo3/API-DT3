import { TeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { UpdateTeamController } from "./UpdateTeamController";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";

const teamRepository = new TeamRepository();

const updateTeamUseCase = new UpdateTeamUseCase(teamRepository);

const updateTeamController = new UpdateTeamController(updateTeamUseCase);

export { updateTeamUseCase, updateTeamController };
