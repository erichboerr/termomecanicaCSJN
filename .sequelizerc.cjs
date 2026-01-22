// .sequelizerc.cjs
const path = require("path");

module.exports = {
  config: path.resolve("backend", "config", "config.cjs"),
  models: path.resolve("backend", "models"),
  migrations: path.resolve("backend", "migrations"),
  seeders: path.resolve("backend", "seeders"),
};