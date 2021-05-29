module.exports = {
  apps: [
    {
      name: "hero-server",
      script: "./api/src/server.js",
      env: {
        PORT: 8004,
        SALT_ROUNDS: 4,
        JWT_SECRET: "secret",
        NODE_ENV: "production",
      },
    },
    {
      name: "hero-client",
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./web/build",
        PM2_SERVE_PORT: 8003,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },
    },
    // {
    //   name: 'hero-mobile',
    //   cwd: "./mobile",
    //   script: "expo",
    //   args: "start --no-dev --minify",
    // },
  ],
};
