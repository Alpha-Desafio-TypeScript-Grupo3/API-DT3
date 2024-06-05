import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { GetUserMeController } from "./GetUserMeController";
import { GetUserMeUseCase } from "./GetUserMeUseCase";

const postgresUserRepository = new PostgresUserRepository();

const getUserMeUseCase = new GetUserMeUseCase(
    postgresUserRepository
);

const getUserMeController = new GetUserMeController(
    getUserMeUseCase
);

export { getUserMeController, getUserMeUseCase };