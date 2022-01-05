// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { BizOwner, RegistrationQns } = initSchema(schema);

export {
  BizOwner,
  RegistrationQns
};