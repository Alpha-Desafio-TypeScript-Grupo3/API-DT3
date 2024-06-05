import { PostgresTeamRepository } from "../../../repositories/implementations/PostgresTeamRepository";
import { UpdateTeamController } from "./UpdateTeamController";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";

const postgresTeamRepository = new PostgresTeamRepository();

const updateTeamUseCase = new UpdateTeamUseCase(postgresTeamRepository);

const updateTeamController = new UpdateTeamController(updateTeamUseCase);

export { updateTeamUseCase, updateTeamController };
