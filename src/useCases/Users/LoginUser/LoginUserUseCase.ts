import { IUserRepository } from "../../../repositories/IUserRepository";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
import { Utils } from "../../../utils/Utils";
import { config } from "../../../config";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {

  constructor(private usersRepository: IUserRepository) {}

  public async execute(data: ILoginUserRequestDTO) {
    const userInDB = await this.usersRepository.getUserByEmail(data.email);

    if (!userInDB) {
      throw new Error(`User with email ${data.email} does not exist.`);
    }

    const matchPasswords = await Utils.comparePassword(data.password, userInDB.password);

    if (!matchPasswords) {
      throw new Error("Invalid email or password");
    }

    const user = {
      id: userInDB.id,
      name: `${userInDB.firstName} ${userInDB.lastName}`,
      email: userInDB.email,
      is_admin: userInDB.isAdmin
    };

    const sessionToken = jwt.sign(user, config.SECRET_KEY);

    return {
      sessionToken: sessionToken,
    };
  }
}
