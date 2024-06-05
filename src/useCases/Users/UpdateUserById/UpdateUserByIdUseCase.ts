import { Utils } from "../../../Utils/Utils";
import { UserValidation } from "../../../Validation/UserValidation";
import { User } from "../../../entities/User"
import { IUserRepository } from "../../../repositories/IUserRepository"
import { IUpdateUserByIdRequestDTO } from "./UpdateUserByIdDTO";

export class UpdateUserByIdUseCase {
    public constructor(
      private postgresUserRepository: IUserRepository
    ) {}
  
    public async execute(userId: string, data: Partial<User>): Promise<string | Partial<User>> {

      const newData: IUpdateUserByIdRequestDTO = {}

      if (data.firstName && data.lastName) {
        UserValidation.nameCheck(data.firstName + ' ' + data.lastName);
        newData.first_name = data.firstName  
        newData.last_name = data.lastName  
      }

      if (data.firstName) {
        UserValidation.nameCheck(data.firstName);
        newData.first_name = data.firstName
      }

      if (data.lastName) {
        UserValidation.nameCheck(data.lastName);
        newData.last_name = data.lastName
      }

      if (data.email) {
        UserValidation.emailCheck(data.email);
        const emailAlreadyExists = await this.postgresUserRepository.findUserByEmail(data.email);
        if (emailAlreadyExists) throw new Error("The email already exists.");
        newData.email = data.email
      }

      if (data.username) {
        const usernameAlreadyExists = await this.postgresUserRepository.findUserByUsername(data.username);
        if (usernameAlreadyExists) throw new Error("The username already exists.");
        newData.username = data.username
      }

      if (data.password) {
        UserValidation.passwordCheck(data.password);
        const hashedPassword: string = await Utils.hashPassword(data.password);
        newData.password = hashedPassword
      }

      if (data.isAdmin !== undefined) newData.is_admin = data.isAdmin;
      try {
        return await this.postgresUserRepository.updateUserById(userId, newData);
      } catch (err: any) {
        throw new Error(err.message)
      }
    }
  }