import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { UpdateUserByIdUseCase } from "./UpdateUserByIdUseCase";
import { UpdateUserByIdController } from "./UpdateUserByIdController";

const postgresUserRepository = new PostgresUserRepository();

const updateUserByIdUseCase = new UpdateUserByIdUseCase(
    postgresUserRepository
);

const updateUserByIdController = new UpdateUserByIdController(
    updateUserByIdUseCase
);

export { updateUserByIdController, updateUserByIdUseCase };