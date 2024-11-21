require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: 'origin/master',
      repo: 'https://github.com/radiophysiker/web-plus-pm2-deploy.git',
      path: DEPLOY_REF,
      'pre-deploy-local': `scp .env.production ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
