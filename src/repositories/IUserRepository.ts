import { User } from "../entities/User";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;

  createUser(user: User): Promise<void>;

  updateUserById(id: string, updatedData: Partial<User>): Promise<void>;

  deleteUserById(id: string): Promise<void>;
  
  getUsers(): Promise<User[]>
}