import { UserValidation } from "../../../Validation/UserValidation";
import { User } from "../../../entities/User"
import { IUserRepository } from "../../../repositories/IUserRepository"

export class DeleteUserByIdUseCase {
    public constructor(
      private postgresUserRepository: IUserRepository
    ) {}
      
    public async execute(userId: string): Promise<string | Partial<User>> {
      console.log(userId)
      UserValidation.uuidCheck(userId)
      const userExists = await this.postgresUserRepository.getUserById(userId)
      if (userExists === null) throw new Error("The user doesn't exists.");

      try {
        return await this.postgresUserRepository.deleteUserById(userId);
      } catch (err: any) {
        throw new Error(err.message)
      }
    }
  }