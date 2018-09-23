import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { ICreateServerBodyModel } from './models';
import { failedResponse } from '../../helpers/responseHandler';

class Validation {
  public create = (req: Request, res: Response, next: NextFunction) => {
    const body: ICreateServerBodyModel = req.body;
    const { error } = Joi.validate(body, {
      name     : Joi.string().max(30).required(),
      baseUrl  : Joi.string().required(),
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