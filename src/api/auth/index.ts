
import { Response, Router } from 'express';

import Validation from './validation';
import Service from './service';
import { sendToSlack } from '../../helpers/errorHandler';
import { IResponseModel, IRequest } from '../../models';
import { ILoginResModel, ILoginBodyModel } from './models';

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

  private login = async(req: IRequest, res: Response) => {
    try {
      const body: ILoginBodyModel = req.body;
      const response: IResponseModel<ILoginResModel> = await this.service.login(body);
      res.send(response);
    } catch (e) {
      sendToSlack(e, req, res);
    }
  }

  public routes() {
    this.router.post('/login', this.validation.login, this.login);
  }
}

export default new PersonContoller().router;
