import { config } from '@root/config';
import { winstonLogger } from '@root/shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Service', 'debug');

export async function create() {}
