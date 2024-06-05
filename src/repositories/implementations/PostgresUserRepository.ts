import { config } from "../../config";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { Pool } from "pg";

export class PostgresUserRepository implements IUserRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      database: config.DATABASE,
      port: 5432,
    });
  }
  findIfUserIsLeader(userId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

 public async findUserByEmail(email: string): Promise<boolean> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result: any = await this.pool.query(query, [email]);
    if(result.rowCount > 0){
      return true
    } else {
      return false
    }
  }

  public async findUserByUsername(username: string): Promise<boolean> {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result: any = await this.pool.query(query, [username]);
    if(result.rowCount > 0){
      return true
    } else {
      return false
    }
  }

  public async getUserById(id: string): Promise<Partial<User> | null> {
    const query = `
    SELECT * FROM Users WHERE id = $1
    `;

    const result = await this.pool.query(query, [id]);

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
    const query = `
        INSERT INTO Users (id, username, first_name, last_name, email, password, squad, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `;
        try {
          const result: any = await this.pool.query(query, 
            [user.id, user.username, user.firstName, user.lastName, user.email, user.password, user.squad, user.isAdmin])
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

    const query = `
      UPDATE Users
      SET ${setClause}
      WHERE id = $${values.length + 1}
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, [...values, id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw new Error("Failed to update user.");
    }
  }

  public async deleteUserById(id: string): Promise<Partial<User>> {
    const query = `
      DELETE FROM Users WHERE id = $1 RETURNING *
    `;

    try {
      const result: any = await this.pool.query(query, [id]);
      console.log(`User with ID ${id} deleted successfully!`);
      return result.rows[0]
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw new Error("Failed to delete user.");
    }
  }

  public async getUsers(): Promise<Partial<User>[]> {
    const query = `
    SELECT * FROM Users
  `;

    try {
      // Execute a consulta SQL para buscar todos os usuários
      const result = await this.pool.query(query);

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
    const query = `
    SELECT * FROM users WHERE email = $1
    `;

    const result = await this.pool.query(query, [email]);

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
}
