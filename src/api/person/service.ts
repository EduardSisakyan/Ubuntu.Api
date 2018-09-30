import { IRegisterBodyModel, IProfileDetailsResModel } from './models';
import { IResponseModel } from './../../models';
import { successResponse, failedResponse } from './../../helpers/responseHandler';

import PersonSchema from '../../schema/person';
import { RoleEnum } from '../../enums';
import { IPersonSchema } from '../../schema/person/model';

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

  public getProfileDetails = async (user: IPersonSchema): Promise<IResponseModel<IProfileDetailsResModel>> => {
    try {
      const newObj: IProfileDetailsResModel = {
        username: user.username,
        role: user.role,
        updatedDt: user.updatedDt,
        createdDt: user.createdDt,
      };
      return successResponse(newObj);
    } catch (e) {
      throw e;
    }
  }
}

export default Service;