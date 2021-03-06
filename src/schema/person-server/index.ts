import * as mongoose from 'mongoose';

import { schemaRef }   from '../../helpers/constants';
import { IPersonServerSchema } from './model';

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: schemaRef.person, required: true },
  server: { type: mongoose.Schema.Types.ObjectId, ref: schemaRef.server, required: true },
});

export default mongoose.model<IPersonServerSchema, mongoose.Model<IPersonServerSchema>>(schemaRef.personServer, schema);