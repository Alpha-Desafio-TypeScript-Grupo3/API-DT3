import { IUserRepository } from "../../../repositories/IUserRepository"
import { IGetUserRequestDTO } from "./GetUserByIdDTO";

export class GetUserByIdUseCase {
    public constructor(
        private postgresUserRespository: IUserRepository
    ) {}

    public async execute(data: IGetUserRequestDTO) {
        return await this.postgresUserRespository.getUserById(data.user_id);
    }
}