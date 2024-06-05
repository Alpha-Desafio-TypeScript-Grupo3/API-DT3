import { Utils } from "../../../utils/Utils";
import { UserValidation } from "../../../Validation/UserValidation";
import { User } from "../../../entities/User"
import { IUserRepository } from "../../../repositories/IUserRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
    public constructor(
      private postgresUserRepository: IUserRepository
    ) {}
  
    public async execute(data: ICreateUserRequestDTO): Promise<string | Partial<User>> {
        UserValidation.nameCheck(data.firstName + ' ' + data.lastName); // Validação do nome completo
        UserValidation.emailCheck(data.email);
        UserValidation.passwordCheck(data.password);
    
        const emailAlreadyExists = await this.postgresUserRepository.findUserByEmail(data.email);
        const usernameAlreadyExists = await this.postgresUserRepository.findUserByUsername(data.username);

        if (emailAlreadyExists) throw new Error("The email already exists.");
        if (usernameAlreadyExists) throw new Error("The username already exists.");
    
        const hashedPassword: string = await Utils.hashPassword(data.password);

        const user = new User({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
        });
  
      try {
        return await this.postgresUserRepository.createUser(user);
      } catch (err: any) {
        throw new Error(err.message)
      }
    }
  }