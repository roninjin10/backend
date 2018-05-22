import express from 'express'

import applyMiddleware from './middleware'
import router from './router'

const app = express();

applyMiddleware(app);

app.use(router);

export default app;
