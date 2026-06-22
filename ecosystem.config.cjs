// ecosystem.config.cjs
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
        DATABASE_URL: "postgres://imgsoluciones:Ifts%40Erich@localhost:5432/sch_termodinamicacsjn",
        DB_HOST: "localhost",
        DB_PORT: "5432",
        DB_NAME: "sch_termodinamicacsjn",
        DB_USER: "imgsoluciones",
        DB_PASSWORD: "Ifts@Erich",
        DB_DIALECT: "postgres",
        DB_SSL: "true",
        JWT_SECRET: "tu-clave-secreta",
        BACKEND_URL: "https://termomecanicacsjn.com",
        FRONTEND_URL: "https://termomecanicacsjn.com",
        DB_SEED: "false",
      },
    },
  ],
};
