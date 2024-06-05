import { Utils } from "../../../Utils/Utils";
import { UserValidation } from "../../../Validation/UserValidation";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    UserValidation.nameCheck(data.first_name + ' ' + data.last_name); // Validação do nome completo
    UserValidation.emailCheck(data.email);
    UserValidation.passwordCheck(data.password);

    const userAlreadyExists = await this.usersRepository.findUserByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("The user already exists.");
    }

    const hashedPassword: string = await Utils.hashPassword(data.password);

    const user = new User({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
      username: data.username,
      squad: data.squad,
      is_admin: data.is_admin
    });

    await this.usersRepository.createUser(user);

    return user;
  }
}
