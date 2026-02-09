const dotenv=require('dotenv');
dotenv.config({path:"./.env.deploy"});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;
module.exports = {
  apps : [
    {
    name   : "name",
    script : "dist/app.js",
    env: { NODE_ENV: "development" },  // Для default или --env development
    env_production: {  // Обязательно для --env production
      NODE_ENV: "production"
      // Добавьте другие vars, напр. PORT: 3000, если нужно
    }
  }
],
 deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
}