import app from './app'
import log from './utils/logger'

const { PORT = 8080 } = process.env;

app.listen(PORT, () => log.info(`Listening on port ${PORT}`));
