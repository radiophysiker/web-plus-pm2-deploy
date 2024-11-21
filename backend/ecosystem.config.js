require('dotenv').config();

const {
  DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
    env_env_production: {
      NODE_ENV: 'production',
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:radiophysiker/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'npm i && pm2 reload ecosystem.config.js --env production && npm run build',
    },
  },
};
