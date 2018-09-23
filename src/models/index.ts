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

export interface IPaginationViewModel<T> {
  count: number;
  currentPage: number;
  data: T;
  limit: number;
}
