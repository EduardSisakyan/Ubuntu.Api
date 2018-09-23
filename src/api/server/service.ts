import { ICreateServerBodyModel } from './models';
import { IResponseModel } from './../../models';
import { successResponse, failedResponse } from './../../helpers/responseHandler';

import ServerSchema from '../../schema/server';
import PersonServerSchema from '../../schema/person-server';
import { IPersonSchema } from './../../schema/person/model';

class Service {

  public create = async (body: ICreateServerBodyModel, user: IPersonSchema): Promise<IResponseModel> => {
    try {
      const CHECK_SERVER = await ServerSchema.findOne({ baseUrl: body.baseUrl }).exec();
      if (CHECK_SERVER) return failedResponse('Server already exists');
      const newServer = await ServerSchema.create({
        baseUrl: body.baseUrl,
        name: body.name,
        password: body.password,
      });

      await PersonServerSchema.create({
        user: user._id,
        server: newServer._id,
      });

      return successResponse();
    } catch (e) {
      throw e;
    }
  }
}

export default Service;