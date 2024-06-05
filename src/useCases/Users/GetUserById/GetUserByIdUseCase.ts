import { IUserRepository } from "../../../repositories/IUserRepository"
import { IGetUserByIdRequestDTO } from "./GetUserByIdDTO";

export class GetUserByIdUseCase {
    public constructor(
        private postgresUserRespository: IUserRepository
    ) {}

    public async execute(data: IGetUserByIdRequestDTO) {
        return await this.postgresUserRespository.getUserById(data.user_id);
    }
}