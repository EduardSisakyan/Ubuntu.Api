import { Document, Model } from 'mongoose';

export interface IServerSchema extends Document {
  name: string;
  username: string;
  host: string;
  password: string;
  salt: string;
  updatedDt: Date;
  createdDt: Date;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(byteSize?: number): string;
}
