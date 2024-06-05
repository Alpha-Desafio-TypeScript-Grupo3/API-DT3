import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";
import { DeleteUserByIdController } from "./DeleteUserByIdController";

const postgresUserRepository = new PostgresUserRepository();

const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
    postgresUserRepository
);

const deleteUserByIdController = new DeleteUserByIdController(
    deleteUserByIdUseCase
);

export { deleteUserByIdController, deleteUserByIdUseCase };