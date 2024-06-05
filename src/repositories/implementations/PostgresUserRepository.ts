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

  async findUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await this.pool.query(query, [email]);

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];
      const user: User = {
        id: userFromDb.id,
        first_name: userFromDb.first_name,
        last_name: userFromDb.last_name,
        email: userFromDb.email,
        password: userFromDb.password,
        username: userFromDb.username,
        squad: userFromDb.squad,
        is_admin: userFromDb.is_admin
      };

      return user;
    } else {
      return null;
    }
  }

  async createUser(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, username, email, first_name, last_name, password, squad, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [user.id, user.username, user.email, user.first_name, user.last_name, user.password, user.squad, user.is_admin];

    await this.pool.query(query, values);
  }

  public async getUserById(id: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];
      const user: User = {
        id: userFromDb.id,
        first_name: userFromDb.first_name,
        last_name: userFromDb.last_name,
        email: userFromDb.email,
        password: userFromDb.password,
        username: userFromDb.username,
        squad: userFromDb.squad,
        is_admin: userFromDb.is_admin
      };

      return user;
    } else {
      return null;
    }
  }

  public async updateUserById(id: string, updatedData: Partial<User>): Promise<void> {
    const { first_name, last_name, email, password, username, squad, is_admin } = updatedData;

    const query = `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3, password = $4, username = $5, squad = $6, is_admin = $7
      WHERE id = $8
    `;
    const values = [first_name, last_name, email, password, username, squad, is_admin, id];

    try {
      await this.pool.query(query, values);
      console.log(`User with ID ${id} updated successfully!`);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new Error("Failed to update user.");
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    const query = `DELETE FROM users WHERE id = $1`;

    try {
      await this.pool.query(query, [id]);
      console.log(`User with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw new Error("Failed to delete user.");
    }
  }

  public async getUsers(): Promise<User[]> {
    const query = `SELECT * FROM users`;

    try {
      const result = await this.pool.query(query);
      const users: User[] = result.rows.map((userFromDb: any) => ({
        id: userFromDb.id,
        first_name: userFromDb.first_name,
        last_name: userFromDb.last_name,
        email: userFromDb.email,
        password: userFromDb.password,
        username: userFromDb.username,
        squad: userFromDb.squad,
        is_admin: userFromDb.is_admin
      }));

      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users.");
    }
  }
}
