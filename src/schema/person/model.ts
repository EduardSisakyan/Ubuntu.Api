import { Document, Model } from 'mongoose';

export interface IPersonSchema extends Document {
  username: string;
  password: string;
  role: number;
  salt: string;
  updatedDt: Date;
  createdDt: Date;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(byteSize?: number): string;
  getToken(): string;
}
