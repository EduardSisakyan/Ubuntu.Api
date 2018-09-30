import { Request } from 'express';
import { IPersonSchema } from '../schema/person/model';

export interface IRequest extends Request {
  user?: IPersonSchema;
}

export interface IResponseModel<T = null> {
  success: boolean;
  data: T;
  message: {
    key: number;
    value: string;
  };
}

export interface IPagingResModel<T> {
  itemCount: number;
  pageCount: number;
  data: T[];
}

export interface IPagingBodyModel {
  limit: number;
  offset: number;
}

export interface IServerConfigModel {
  host: string;
  username: string;
  password: string;
  port?: number;
}
