import * as express from 'express';

import PersonContoller from './person';
import AuthContoller from './auth';

export default (app: express.Application) => {
  app.use('/api/person', PersonContoller);
  app.use('/api/auth', AuthContoller);
};