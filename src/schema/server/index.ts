import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

import { schemaRef }   from '../../helpers/constants';
import { IServerSchema, IServerModel } from './model';

const schema = new mongoose.Schema({
  name      : { type: String, required: true },
  baseUrl   : { type: String, unique: true, required: true },
  password  : { type: String, required: true },
  role      : { type: Number, required: true },
  salt      : { type: String, required: true },
  updatedDt : { type: Date, required: true },
  createdDt : { type: Date, default: Date.now },
});


schema.pre('validate', function (next) {
  const _this: IServerSchema = <any>this;
  _this.updatedDt = new Date();

  if (_this.isModified('password')) {
    _this.salt = _this.makeSalt();
    const hashedPassword: string = _this.encryptPassword(_this.password);

    if (!hashedPassword) return next(new Error('Error when update password'));

    _this.password = hashedPassword;
  }

  return next();
});

schema.methods.authenticate = function (password: string): boolean {
  const _this: IServerSchema = <any>this;
  return _this.password === _this.encryptPassword(password);
};

schema.methods.encryptPassword = function (password: string): string {
  const _this: IServerSchema = <any>this;
  if (!password || !_this.salt) return null;

  const defaultIterations: number = 10000;
  const defaultKeyLength: number = 64;
  const salt = new Buffer(_this.salt, 'base64');

  return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha1').toString('base64');
};

schema.methods.makeSalt = function (byteSize: number = 16): string {
  return crypto.randomBytes(byteSize).toString('base64');
};

export default mongoose.model<IServerSchema, IServerModel>(schemaRef.server, schema);