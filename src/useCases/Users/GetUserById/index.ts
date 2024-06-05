import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";


const postgresUserRepository = new PostgresUserRepository();

const getUserbyIdUseCase = new GetUserByIdUseCase(
    postgresUserRepository
);

const getUserByIdController = new GetUserByIdController(
    getUserbyIdUseCase
);

export { getUserByIdController, getUserbyIdUseCase };