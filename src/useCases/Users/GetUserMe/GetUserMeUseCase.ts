import { IUserRepository } from "../../../repositories/IUserRepository"

export class GetUserMeUseCase {
    public constructor(
        private postgresUserRespository: IUserRepository
    ) {}

    public async execute(userId:string) {
        return await this.postgresUserRespository.getUserMe(userId);
    }
}