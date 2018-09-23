import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';

import config from './config';

import Routes from './api/routes';

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
    // this.app.use((req: express.Request, res, next) => {
      // const fs = require('fs');
      // fs.readFile('./src/index.ts', 'utf8', function (err, data) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   const result = data.replace(/string to be replaced/g, 'replacement');

      //   fs.writeFile('./src/index.ts', result, 'utf8', function (err) {
      //     if (err) return console.log(err);
      //   });
      // });
    //   next();
    // });

    // express middleware
    this.app.use(cors());
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