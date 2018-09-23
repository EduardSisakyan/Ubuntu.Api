
import { Response, Router } from 'express';

import { ICreateServerBodyModel } from './models';
import Validation from './validation';
import Service from './service';
import { sendToSlack } from '../../helpers/errorHandler';
import { IResponseModel, IRequest } from '../../models';

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
    this.router.post('/create', this.validation.create, this.create);
  }
}

export default new ServerContoller().router;
