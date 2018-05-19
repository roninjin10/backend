
console.log('process.env', process.env);
import app from './app'
import log from './utils/logger'
import db from '../db/models'

const { PORT = 8080 } = process.env;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => log.info(`Listening on port ${PORT}`));
})
