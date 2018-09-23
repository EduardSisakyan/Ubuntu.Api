import { IResponseModel } from '../models';
import { ResponseMessageEnum }      from '../enums';

export const successResponse = <T = null>(data?: T): IResponseModel<T> => {
  return {
    success: true,
    data: data || null,
    message: {
      key: ResponseMessageEnum.Info,
      value: 'ok',
    }
  };
};

export const failedResponse = (message?: string): IResponseModel => {
  return {
    success: false,
    data: null,
    message: {
      key: ResponseMessageEnum.Error,
      value: message || 'Something went wrong',
    }
  };
};