
import { Response, Router } from 'express';

import { IRegisterBodyModel } from './models';
import Validation from './validation';
import Service from './service';
import { sendToSlack } from '../../helpers/errorHandler';
import { IResponseModel, IRequest } from '../../models';

class PersonContoller {
  public router: Router;
  public validation: Validation;
  public service: Service;

  constructor() {
    this.router = Router();
    this.validation = new Validation();
    this.service = new Service();
    this.routes();
  }

  private signUp = async(req: IRequest, res: Response) => {
    try {
      const body: IRegisterBodyModel = req.body;
      const response: IResponseModel = await this.service.register(body);
      res.send(response);
    } catch (e) {
      sendToSlack(e, req, res);
    }
  }

  public routes() {
    this.router.post('/signUp', this.validation.signUp, this.signUp);
  }
}

export default new PersonContoller().router;
