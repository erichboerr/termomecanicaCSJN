// backend/dataBase/db.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../.env.production")
      : path.join(__dirname, "../.env"),
});
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL no está definida. Abortando.");
  process.exit(1);
}
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
  logging: false,
});
export default db;
