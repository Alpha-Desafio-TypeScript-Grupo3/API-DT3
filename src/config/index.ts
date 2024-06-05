/* import dotenv from "dotenv";
dotenv.config();

const config = {
  SECRET_KEY: process.env.SECRET_KEY || "uma_senha_qualquer",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "joaozinho",
  DB_PASSWORD: process.env.DB_PASSWORD || "senha",
  DATABASE: process.env.DATABASE || "meu_banco"
};

export { config }; */

import dotenv from "dotenv";
dotenv.config();

interface Config {
  DATABASE: string | undefined;
  DB_HOST: string | undefined;
  DB_PASSWORD: string | (() => string | Promise<string>) | undefined;
  DB_USER: string | undefined;
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
  DATABASE: undefined,
  DB_HOST: undefined,
  DB_PASSWORD: undefined,
  DB_USER: undefined
};

export interface ConfigDatabase {
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
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