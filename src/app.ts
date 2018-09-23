import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import config from './config';

import Routes from './api/routes';
import { failedResponse } from './helpers/responseHandler';

const ev = require('express-validation');

class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  private config = (): void => {
    // cors
     this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    // express middleware
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(morgan('dev'));
    this.app.use(express.static(config.mediaPath));
  }

  // application routes
  public routes = (): void => {
    Routes(this.app);

    this.app.use((req, res, next) => {
      const error: any = new Error('Not found');
      error.status = 404;
      next(error);
    });

    this.app.use((error: any, req: express.Request, res: express.Response, next) => {
      console.log(error.message);
      res.status(error.status || 500).json({ message: error.message });
    });
  }
}

// export
export default new Server().app;