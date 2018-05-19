import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (process.env.DATABASE_URL) {

  const match = process.env.DATABASE_URL.match(
    /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
  );
            
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

  sequelize = new Sequelize(config.base, config.user, config.pass, config.options);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
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
