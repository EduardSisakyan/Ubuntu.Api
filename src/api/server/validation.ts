import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { ICreateServerBodyModel, IGetServersListBodyModel } from './models';
import { failedResponse } from '../../helpers/responseHandler';
import { withPaging } from '../validation';

class Validation {

  public getList = (req: Request, res: Response, next: NextFunction) => {
    const body: IGetServersListBodyModel = req.body;
    const { error } = Joi.validate(body, {
      ...withPaging
    });

    if (error && error.details) {
      const response = failedResponse(error.details[0].message);
      return res.send(response);
    }
    next();
  }

  public create = (req: Request, res: Response, next: NextFunction) => {
    const body: ICreateServerBodyModel = req.body;
    const { error } = Joi.validate(body, {
      name     : Joi.string().max(30).required(),
      username : Joi.string().required(),
      host     : Joi.string().required(),
      password : Joi.string().min(1).required(),
    });

    if (error && error.details) {
      const response = failedResponse(error.details[0].message);
      return res.send(response);
    }
    next();
  }
}

export default Validation;