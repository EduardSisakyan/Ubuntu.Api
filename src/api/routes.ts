import * as express from 'express';

import PersonContoller from './person';
import AuthContoller from './auth';
import ServerContoller from './server';

export default (app: express.Application) => {
  app.use('/api/auth', AuthContoller);
  app.use('/api/person', PersonContoller);
  app.use('/api/server', ServerContoller);
};