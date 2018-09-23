import { Document, Model } from 'mongoose';

export interface IServerSchema extends Document {
  name: string;
  baseUrl: string;
  password: string;
  salt: string;
  updatedDt: Date;
  createdDt: Date;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(byteSize?: number): string;
}

export interface IServerModel extends Model<IServerSchema> {}
