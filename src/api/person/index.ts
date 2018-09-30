
import { Response, Router } from 'express';

import { IRegisterBodyModel, IProfileDetailsResModel } from './models';
import Validation from './validation';
import Service from './service';
import { sendToSlack } from '../../services/slack';
import { IResponseModel, IRequest } from '../../models';
import { authorize } from '../validation';

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

  private getProfileDetails = async(req: IRequest, res: Response) => {
    try {
      const response: IResponseModel<IProfileDetailsResModel> = await this.service.getProfileDetails(req.user);
      res.send(response);
    } catch (e) {
      sendToSlack(e, req, res);
    }
  }

  public routes() {
    this.router.get('/ProfileDetails', authorize(), this.getProfileDetails);

    this.router.post('/SignUp', this.validation.signUp, this.signUp);
  }
}

export default new PersonContoller().router;
