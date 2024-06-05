import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { GetUsersUseCase } from "./GetUsersUseCase";
import { GetUsersController } from "./GetUsersController";

const postgresUserRepository = new PostgresUserRepository();

const getUsersUseCase = new GetUsersUseCase(
    postgresUserRepository
);

const getUsersController = new GetUsersController(
    getUsersUseCase
);

export { getUsersController, getUsersUseCase };