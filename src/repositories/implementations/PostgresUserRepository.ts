import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { database } from "../../database/postgres";
export class PostgresUserRepository implements IUserRepository {

  findIfUserIsLeader(userId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async findUserByEmail(email: string): Promise<boolean> {
    const result = await database.executeQuery({
      query: `SELECT * FROM users WHERE email = $1`, 
      args:[email]});
    if (result.rowCount > 0) {
      return true
    } else {
      return false
    }
  }

  public async findUserByUsername(username: string): Promise<boolean> {
    const result = await database.executeQuery({
      query: `SELECT * FROM users WHERE username = $1`, 
      args:[username]});
    if (result.rowCount > 0) {
      return true
    } else {
      return false
    }
  }

  public async getUserById(id: string): Promise<Partial<User> | null> {
    const result = await database.executeQuery({
      query: `SELECT * FROM Users WHERE id = $1`, 
      args:[id]});

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];

      const user: Partial<User> = {
        id: userFromDb.id,
        username: userFromDb.username,
        firstName: userFromDb.first_name,
        lastName: userFromDb.last_name,
        email: userFromDb.email,
        squad: userFromDb.squad,
        isAdmin: userFromDb.is_admin
      };

      return user;
    } else {
      return null;
    }
  }

  public async createUser(user: User): Promise<Partial<User> | string> {
    try {
    const result = await database.executeQuery({
      query: `INSERT INTO Users (id, username, first_name, last_name, email, password, squad, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
      args:[user.id, 
            user.username, 
            user.firstName, 
            user.lastName, 
            user.email, 
            user.password, 
            user.squad, 
            user.isAdmin]});
      console.log("User inserted successfully!", user);
      return result.rows[0];
    } catch (err: any) {
      console.error("Error inserting user:", err.message);
      return err.message
    }
  }


  public async updateUserById(id: string, updatedData: Partial<User>): Promise<Partial<User>> {
    const setClause = Object.keys(updatedData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = Object.values(updatedData);
    try {
      const result = await database.executeQuery({
        query: `
        UPDATE Users
        SET ${setClause}
        WHERE id = $${values.length + 1}
        RETURNING *;`, 
        args:[...values, id]});

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw new Error("Failed to update user.");
    }
  }

  public async deleteUserById(id: string): Promise<Partial<User>> {
    try {
      const result = await database.executeQuery({
        query: `DELETE FROM Users WHERE id = $1 RETURNING *`, 
        args:[id]});

      console.log(`User with ID ${id} deleted successfully!`);
      return result.rows[0]
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw new Error("Failed to delete user.");
    }
  }

  public async getUsers(): Promise<Partial<User>[]> {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM Users`, 
        args:[]});

      // Mapeie os resultados para o formato da interface User
      const users: Partial<User>[] = result.rows.map((userFromDb: any) => ({
        id: userFromDb.id,
        username: userFromDb.username,
        firstName: userFromDb.first_name,
        lastName: userFromDb.last_name,
        email: userFromDb.email,
        squad: userFromDb.squad,
        isAdmin: userFromDb.is_admin
      }));

      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users.");
    }


  }
  public async getUserByEmail(email: string): Promise<User | null> {
    const result = await database.executeQuery({
      query: `SELECT * FROM users WHERE email = $1`, 
      args:[email]});

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];
      const user: User = {
        id: userFromDb.id,
        firstName: userFromDb.first_name,
        lastName: userFromDb.last_name,
        email: userFromDb.email,
        password: userFromDb.password,
        username: userFromDb.username,
        squad: userFromDb.squad,
        isAdmin: userFromDb.is_admin,
      };

      return user;
    } else {
      return null;
    }
  }
  public async getUserMe(id: string): Promise<Partial<User>> {
    try {
        const result = await database.executeQuery({
            query: `SELECT * FROM users WHERE id = $1`,
            args: [id]
        });

        if (result.rowCount < 1) {
            throw new Error("User not Found");
        }

        return result.rows[0];
    } catch (err) {
        throw new Error("User not Found");
    }
};

}
