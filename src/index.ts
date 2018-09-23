import * as http from 'http';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import chalk from 'chalk';

import app from './app';
import config from './config';

bluebird.promisifyAll(mongoose);
(<any>mongoose).Promise = bluebird;

http.createServer(app).listen(config.port, () => console.log('Server running on ' + config.port));

mongoose.connect(config.mongodb, { useNewUrlParser: true }).then(
  () => {
    console.log(chalk.green('MongoDB connected successfully'));
  },
  err => {
    console.error(chalk.red(`MongoDB connection error: ${err}`));
  }
);
