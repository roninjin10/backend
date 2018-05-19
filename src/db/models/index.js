import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
/*
if (config.use_env_variable) {
  sequelize = new Sequelize({
    url: process.env.DATABASE_URL, 
    dialect: 'postgres',
    ssl: true,
  });
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}*/

let config = {
  "use_env_variable": "DATABASE_URL",
  "dialect": "postgres",
  "ssl": true
}

if (config.use_env_variable) {
  sequelize = new Sequelize(/*process.env[config.use_env_variable], */{
    ...config,
    url: `postgres://psujmmqgzgpfgo:0b5962328e2ccef022bf1759be702e1d7f58e132416d72524b9b7bd4cbe34f6c@ec2-54-243-54-6.compute-1.amazonaws.com:5432/dbiff713ut8it3` //process.env[config.use_env_variable],
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({force: false});

export default db
