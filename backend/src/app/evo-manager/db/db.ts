import { createConnection, Connection} from 'mongoose';
import logger from '../../../shared/middlewares/winston';

let connection: Connection;
export const connectToEvoManagerDB = () => {
  const dbUri: string = `${process.env.DB_URI as string}${process.env.DB_NAME_EVO_MANAGER as string}`;
  if(!connection) {
    logger.info('Start connecting db evo_manager...');
    connection = createConnection(dbUri, {useNewUrlParser: true, useFindAndModify: true})
  }
  if(connection) logger.info('Return mongoose aready connected to evo_manager');
  return connection

};

