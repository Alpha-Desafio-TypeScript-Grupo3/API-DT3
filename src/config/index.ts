import dotenv from "dotenv";
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

export { config };
