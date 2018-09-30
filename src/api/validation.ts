import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import { Response, NextFunction } from 'express';

import PersonSchema from '../schema/person';
import config from '../config';
import { IRequest } from '../models';

const verifyToken = (token: string): string => {
  try {
    const data: any = jwt.verify(token, config.secretKey);
    return data._id;
  } catch (err) {
    return null;
  }
};

export const authorize = (roles?: number[]) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer ')) {
      return res.sendStatus(401);
    }
    const TOKEN = req.headers.authorization.slice(7, req.headers.authorization.length);
    const id: string = verifyToken(TOKEN);
    if (!id) return res.sendStatus(401);

    const user = await PersonSchema.findById(id).exec();
    if (!user) return res.sendStatus(401);
    if (roles && !roles.includes(user.role)) return res.sendStatus(403);

    req.user = user;
    return next();
  };
};

export const withPaging = {
  limit  : Joi.number().min(1).required(),
  offset : Joi.number().min(0).required(),
};
