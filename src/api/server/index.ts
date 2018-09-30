
import { Response, Router } from 'express';

import Validation      from './validation';
import Service         from './service';
import { authorize }   from '../validation';
import { sendToSlack } from '../../services/slack';

import { ICreateServerBodyModel }                    from './models';
import { IServerSchema }                             from '../../schema/server/model';
import { IResponseModel, IRequest, IPagingResModel } from '../../models';

class ServerContoller {
  public router: Router;
  public validation: Validation;
  public service: Service;

  constructor() {
    this.router = Router();
    this.validation = new Validation();
    this.service = new Service();
    this.routes();
  }

  private getList = async(req: IRequest, res: Response) => {
    try {
      const body: ICreateServerBodyModel = req.body;
      const response: IResponseModel<IPagingResModel<IServerSchema>> = await this.service.getList(body, req.user);
      res.send(response);
    } catch (e) {
      sendToSlack(e, req, res);
    }
  }

  private create = async(req: IRequest, res: Response) => {
    try {
      const body: ICreateServerBodyModel = req.body;
      const response: IResponseModel = await this.service.create(body, req.user);
      res.send(response);
    } catch (e) {
      sendToSlack(e, req, res);
    }
  }

  public routes() {
    this.router.post('/GetList', authorize(), this.validation.getList, this.getList);
    this.router.post('/Create', authorize(), this.validation.create, this.create);
  }
}

export default new ServerContoller().router;
