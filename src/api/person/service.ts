import { IRegisterBodyModel } from './models';
import { IResponseModel } from './../../models';
import { successResponse, failedResponse } from './../../helpers/responseHandler';

import PersonSchema from '../../schema/person';
import { RoleEnum } from '../../enums';

class Service {

  public register = async (body: IRegisterBodyModel): Promise<IResponseModel> => {
    try {
      const CHECK_USER = await PersonSchema.findOne({ username: body.username }).exec();
      if (CHECK_USER) return failedResponse('Username already exists');
      await PersonSchema.create({
        username: body.username,
        password: body.password,
        role: RoleEnum.Admin,
      });

      return successResponse();
    } catch (e) {
      throw e;
    }
  }
}

export default Service;