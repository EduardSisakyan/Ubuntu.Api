import * as express from 'express';

import PersonContoller from './person';
import AuthContoller from './auth';
import ServerContoller from './server';

export default (app: express.Application) => {
  app.use('/api/Auth', AuthContoller);
  app.use('/api/Person', PersonContoller);
  app.use('/api/Server', ServerContoller);
};