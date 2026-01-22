import dotenv from "dotenv";
dotenv.config();

const getPassword = () => {
  const raw = process.env.DB_PASSWORD;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("❌ DB_PASSWORD debe ser un string válido y no vacío");
  }
  return raw;
};

export const getDbConfig = () => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";

  return {
    username: process.env.DB_USERNAME,
    password: getPassword(),
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT || "postgres",
    logging: !isProduction,
    dialectOptions:
      isProduction && process.env.DB_SSL === "true"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  };
};
