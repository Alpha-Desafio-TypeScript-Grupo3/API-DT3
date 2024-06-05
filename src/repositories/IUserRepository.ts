import { User } from "../entities/User";

export interface IUserRepository {

  findUserByEmail(email: string): Promise<User | null>;

  getUserById(id: string): Promise<User | null>;

  createUser(user: User): Promise<void>;

  updateUserById(id: string, updatedData: Partial<User>): Promise<void>;

  deleteUserById(id: string): Promise<void>;
  
  getUsers(): Promise<User[]>

  findIfUserIsLeader(userId: string): Promise<boolean>
}