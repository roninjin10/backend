const config = {
  "development": {
    "username": "postgres",
    "password": "G,iANp5g\"W3q&f#fL(Vm\"2Ks&",
    "database": "catalyst_development",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "G,iANp5g\"W3q&f#fL(Vm\"2Ks&",
    "database": "catalyst_development",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "ssl": true
  }
}

if (process.env.DATABASE_URL) {
  config.production.url = process.env.DATABASE_URL
}

module.exports = config;