/* import dotenv from "dotenv";
dotenv.config();

const config = {
  SECRET_KEY: process.env.SECRET_KEY || "uma_senha_qualquer",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export { config }; */

import dotenv from "dotenv";
dotenv.config();

interface Config {
  MODE_ENV: string;
  HOST: string;
  PORT: number;
  SECRET_KEY: string;
}

const config: Config = {
  MODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || "127.0.0.1",
  PORT: Number(process.env.PORT) || 3000,
  SECRET_KEY: process.env.SECRET_KEY || "my_epic_key",
};

interface ConfigDatabase {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DATABASE: string;
  DB_PORT: number;
}

const configDatabase: ConfigDatabase = {
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_USERNAME: process.env.DB_USERNAME || "default_username",
  DB_PASSWORD: process.env.DB_PASSWORD || "default_password",
  DATABASE: process.env.DATABASE || "default_database",
  DB_PORT: Number(process.env.DB_PORT) || 404,
};

export { config, configDatabase };