import { User } from "../entities/User";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<boolean>;

  findUserByUsername(username: string): Promise<boolean>;

  getUserById(id: string): Promise<Partial<User> | null>;

  createUser(user: User): Promise<Partial<User> | string>;

  updateUserById(id: string, updatedData: Partial<User>): Promise<Partial<User>>;

  deleteUserById(id: string): Promise<Partial<User>>;
  
  getUsers(): Promise<Partial<User>[]>
}