import { Sequelize } from "sequelize";

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
