import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { IRegisterBodyModel } from './models';
import { failedResponse } from '../../helpers/responseHandler';

class Validation {
  public signUp = (req: Request, res: Response, next: NextFunction) => {
    const body: IRegisterBodyModel = req.body;
    const { error } = Joi.validate(body, {
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().min(5).max(30).required(),
    });

    if (error && error.details) {
      const response = failedResponse(error.details[0].message);
      return res.send(response);
    }
    next();
  }
}

export default Validation;