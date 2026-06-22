module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      cwd: "/root/termomecanicaCSJN-postgeSQL/backend",
      interpreter: "/usr/bin/node",
      env_production: {
        NODE_ENV: "production",
        PORT: 5050,

        // 🔑 Variables críticas (se leen del entorno)
        DATABASE_URL: process.env.DATABASE_URL,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DIALECT: "postgres",
        DB_SSL: "true",

        // 🔒 Seguridad y configuración
        JWT_SECRET: process.env.JWT_SECRET,
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        DB_SEED: process.env.DB_SEED || "false",
        DB_SYNC: process.env.DB_SYNC || "false",
      },
    },
  ],
};
