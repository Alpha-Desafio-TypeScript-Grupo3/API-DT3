import { IUserRepository } from "../../../repositories/IUserRepository"

export class GetUsersUseCase {
    public constructor(
        private postgresUserRespository: IUserRepository
    ) {}

    public async execute() {
        return await this.postgresUserRespository.getUsers()
    }
}