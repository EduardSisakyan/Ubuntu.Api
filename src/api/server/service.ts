import { ICreateServerBodyModel } from './models';
import { IResponseModel, IPagingResModel } from './../../models';
import { successResponse, failedResponse } from './../../helpers/responseHandler';

import ServerSchema from '../../schema/server';
import PersonServerSchema from '../../schema/person-server';
import { IPersonSchema } from './../../schema/person/model';
import { checkConnection } from '../../services/ssh';
import { pagination } from '../../helpers/utilities';
import { IPersonServerSchema } from './../../schema/person-server/model';
import { IServerSchema } from './../../schema/server/model';

class Service {

  public getList = async (body: ICreateServerBodyModel, user: IPersonSchema): Promise<IResponseModel<IPagingResModel<IServerSchema>>> => {
    try {
      const servers = PersonServerSchema
        .find({ user: user._id })
        .populate({
          path: 'server',
          select: '-salt -password -__v',
        });

      const paging = await pagination<IPersonServerSchema<string, IServerSchema>>(body, servers);
      const data: IPagingResModel<IServerSchema> = {
        ...paging,
        data: paging.data.map(item => item.server),
      };
      return successResponse(data);
    } catch (e) {
      throw e;
    }
  }

  public create = async (body: ICreateServerBodyModel, user: IPersonSchema): Promise<IResponseModel> => {
    try {
      const CHECK_SERVER = await ServerSchema.findOne({ host: body.host }).exec();
      if (CHECK_SERVER) return failedResponse('Server already exists');
      const AUTH_SERVER = await checkConnection({
        username: body.username,
        password: body.password,
        host: body.host,
      });

      if (!AUTH_SERVER) return failedResponse('Server authintication failure');

      const newServer = await ServerSchema.create(body);

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