import { configDatabase } from "../config/index";
import { Pool } from "pg";

interface QueryConfig {
    query: string;
    args?: any[];
}

class Database {
    private pool!: Pool;

    constructor() {
        this.config();
    }

    private config(): void {

        console.log(configDatabase);

        this.pool = new Pool({
            user: configDatabase.DB_USERNAME,
            host: configDatabase.DB_HOST,
            database: configDatabase.DATABASE,
            password: configDatabase.DB_PASSWORD,
            port: Number(configDatabase.DB_PORT),
            max: 20,
        });
    }

    public async executeQuery({ query, args }: QueryConfig): Promise<any> {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const result = await client.query(query, args);

            await client.query("COMMIT");

            client.release();

            return result;
        } catch (error) {
            await client.query("ROLLBACK");

            client.release();

            throw error;
        }
    }
}

const database = new Database();

export { database };
