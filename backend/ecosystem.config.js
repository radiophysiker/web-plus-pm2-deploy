require('dotenv').config();

const {
  DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/index.js',
    env_env_production: {
      NODE_ENV: 'production',
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
    },
    env_development: {
      NODE_ENV: 'development',
      DATABASE_HOST: 'localhost',
      DATABASE_USER: 'test-user',
      DATABASE_PASSWORD: 'test-user-password',
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:radiophysiker/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
