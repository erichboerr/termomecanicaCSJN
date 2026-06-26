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
      },
    },
  ],
};
