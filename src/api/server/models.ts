import { IPagingBodyModel } from '../../models';

export interface ICreateServerBodyModel {
  name: string;
  host: string;
  username: string;
  password: string;
}

export interface IGetServersListBodyModel extends IPagingBodyModel {}
