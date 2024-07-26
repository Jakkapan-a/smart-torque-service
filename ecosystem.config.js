// Nestjs 
module.exports = {
  apps : [{
    name:"smart-torque-service",
    script: "dist/main.js",
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};

/* COMMAND 
pm2 start ecosystem.config.js --env production

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js

*/