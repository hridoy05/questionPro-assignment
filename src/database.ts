import { winstonLogger } from '@root/shared';
import { Logger } from 'winston';
import { config } from '@root/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'DatabaseServer', 'debug');

// export const sequelize: Sequelize = new Sequelize(process.env.MYSQL_DB!,  {
//   dialect: 'mysql',
//   logging: false,
//   dialectOptions: {
//     multipleStatements: true
//   }
// });

export async function databaseConnection(): Promise<void> {
  try {
    // await sequelize.authenticate();
    log.info('Mysql database connection has been established successfully.');
  } catch (error) {
    log.error('Unable to connect to database.');
    log.log('error', ' databaseConnection() method error:', error);
  }
}
