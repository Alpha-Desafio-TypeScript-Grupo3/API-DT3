import { IUserRepository } from "../../../repositories/IUserRepository"

export class GetUserByIdUseCase {
    public constructor(
        private postgresUserRespository: IUserRepository
    ) {}

    public async execute(user_id: string) {
        return await this.postgresUserRespository.getUserById(user_id);
    }
}