import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import PersonSchema from '../schema/person';
import config from '../config';
import { IRequest } from '../models';

class AppValidation {
  public verifyToken = (token: string): string => {
    try {
      const data: any = jwt.verify(token, config.secretKey);
      return data._id;
    } catch (err) {
      return null;
    }
  }

  public authorize = async (roles: number[]) => {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      if (!req.headers.authorization || req.headers.authorization.includes('Bearer ')) {
        return res.sendStatus(401);
      }
      const TOKEN = req.headers.authorization.slice(7, req.headers.authorization.length);
      const id: string = this.verifyToken(TOKEN);
      if (!id) return res.sendStatus(401);

      const user = await PersonSchema.findById(id).exec();
      if (!user) return res.sendStatus(401);
      if (roles && !roles.includes(user.role)) return res.sendStatus(403);

      req.user = user;
      return next();
    };
  }
}

export default AppValidation;