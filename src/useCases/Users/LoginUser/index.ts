import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { LoginUserUseCase } from "./LoginUserUseCase";
import { LoginUserController } from "./LoginUserController";

const postgresUsersRepository = new PostgresUserRepository();

const loginUserUseCase = new LoginUserUseCase(
    postgresUsersRepository
);

const loginUserController = new LoginUserController(
    loginUserUseCase
);

export { loginUserController, loginUserUseCase };