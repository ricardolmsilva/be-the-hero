module.exports = {
  apps: [
    {
      name: 'hero-server',
      script: './api/src/server.js',
      env: {
        PORT: 5000,
        SALT_ROUNDS: 4,
        JWT_SECRET: 'secret',
        NODE_ENV: 'production',
      }
    },
    {
      name: 'hero-client',
      script: "./web/server.js",
      env: {
        //PM2_SERVE_PATH: './web/build',
        //PM2_SERVE_PORT: 8080,
        PORT: 8080,
      }
    },
  ],
};
