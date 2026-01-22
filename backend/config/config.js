import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "production"
  ? ".env.production"
  : ".env";

dotenv.config({ path: path.resolve(envFile) });

console.log("🔍 DB_USER:", process.env.DB_USER);
console.log("🔍 DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("🔍 DB_HOST:", process.env.DB_HOST);
console.log("🔍 DB_NAME:", process.env.DB_NAME);


export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: Number(process.env.DB_PORT),
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },

};