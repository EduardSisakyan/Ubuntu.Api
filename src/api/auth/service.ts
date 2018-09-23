import { ILoginBodyModel, ILoginResModel } from './models';
import { IResponseModel } from './../../models';
import { successResponse, failedResponse } from './../../helpers/responseHandler';

import PersonSchema from '../../schema/person';
import { IPersonSchema } from './../../schema/person/model';

class Service {

  public login = async (body: ILoginBodyModel): Promise<IResponseModel<ILoginResModel>> => {
    try {
      const user: IPersonSchema = await PersonSchema.findOne({ username: body.username }).exec();
      if (!user || !user.authenticate(body.password)) {
        return failedResponse('Username or password is incorrect');
      }
      const accessToken: string = user.getToken();
      return successResponse<ILoginResModel>({ accessToken });
    } catch (e) {
      throw e;
    }
  }
}

export default Service;