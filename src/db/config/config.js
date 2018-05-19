
let match = ['hacky', 'way', 'of', 'getting', 'env', 'variables'];

if (process.env.DATABASE_URL) {
  match = process.env.DATABASE_URL.match(
    /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
  );
}
            
const config = {
  user: match[1],
  pass: match[2],
  base: match[5],
  options: {
    dialect: 'postgres',
    protocol: 'postgres',
    host: match[3],
    logging: false,
    port: match[4],
    dialectOptions: {
      ssl: true
    }
  }
};



module.exports = {
  development: {
    username: 'postgres',
    password: 'G,iANp5g"W3q&f#fL(Vm"2Ks&',
    database: 'catalyst_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'G,iANp5g"W3q&f#fL(Vm"2Ks&',
    database: 'catalyst_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: config.user,
    password: config.pass,
    database: config.base,
    host: config.options.host,
    dialect: 'postgres',
    port: config.options.port,
    dialectOptions: {
      ssl: true,
    }
  }
};