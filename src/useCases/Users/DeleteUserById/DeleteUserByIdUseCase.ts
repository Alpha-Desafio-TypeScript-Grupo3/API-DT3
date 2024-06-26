import { UserValidation } from "../../../Validation/UserValidation";
import { User } from "../../../entities/User"
import { IUserRepository } from "../../../repositories/IUserRepository"
import { IDeleteUserDTO } from "./DeleteUserByIdDTO";
import { NotFoundException, InternalServerException } from "../../../utils/exceptions";
export class DeleteUserByIdUseCase {
    public constructor(
      private postgresUserRepository: IUserRepository
    ) {}
      
    public async execute(data: IDeleteUserDTO): Promise<string | Partial<User>> {
      console.log(data.userId)
      UserValidation.uuidCheck(data.userId)
      const userExists = await this.postgresUserRepository.getUserById(data.userId)
      if (userExists === null) throw new NotFoundException("The user doesn't exists.");

      try {
        return await this.postgresUserRepository.deleteUserById(data.userId);
      } catch (err: any) {
        throw new InternalServerException()
      }
    }
  }