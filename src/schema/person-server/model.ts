import { Document, Model } from 'mongoose';

export interface IPersonServerSchema<User = string, Server = string> extends Document {
  user: User;
  server: Server;
}
