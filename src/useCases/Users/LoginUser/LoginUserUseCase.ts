import { IUserRepository } from "../../../repositories/IUserRepository";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
import { Utils } from "../../../Utils/Utils";
import { config } from "../../../config";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {

  constructor(private usersRepository: IUserRepository) {}

  public async execute(data: ILoginUserRequestDTO) {
    const userInDB = await this.usersRepository.findUserByEmail(data.email);

    if (!userInDB) {
      throw new Error(`User with email ${data.email} does not exist.`);
    }

    const matchPasswords = await Utils.comparePassword(data.password, userInDB.password);

    if (!matchPasswords) {
      throw new Error("Invalid email or password");
    }

    const user = {
      id: userInDB.id,
      name: `${userInDB.first_name} ${userInDB.last_name}`,
      email: userInDB.email,
    };

    const sessionToken = jwt.sign(user, config.SECRET_KEY);

    return {
      sessionToken: sessionToken,
    };
  }
}
