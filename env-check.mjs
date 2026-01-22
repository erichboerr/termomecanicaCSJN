import dotenv from "dotenv";
dotenv.config({ path: ".env.production" });

console.log("🔍 DB_USER:", process.env.DB_USER);
console.log("🔍 DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("🔍 DB_HOST:", process.env.DB_HOST);
console.log("🔍 DB_NAME:", process.env.DB_NAME);