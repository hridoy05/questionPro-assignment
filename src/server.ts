import http from 'http';

import 'express-async-errors';
import { CustomError, IErrorResponse, winstonLogger } from '@root/shared';
import { Logger } from 'winston';
import { config } from '@root/config';
import { Application, Request, Response, NextFunction, json, urlencoded } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
// import { checkConnection, createIndex } from '@root/elasticsearch';
import { appRoutes } from '@root/routes';
import { Channel } from 'amqplib';
// import { createConnection } from '@root/queues/connection';

const SERVER_PORT = 5000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Server', 'debug');

export let authChannel: Channel;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  // startQueues();
  // startElasticSearch();
  errorHandler(app);
  startServer(app);
}

function securityMiddleware(app: Application): void {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
  );
}

function standardMiddleware(app: Application): void {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

// async function startQueues(): Promise<void> {
//   authChannel = await createConnection() as Channel;
// }

// function startElasticSearch(): void {
//   checkConnection();
//   createIndex('root');
// }

function errorHandler(app: Application): void {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    log.log('error', `Service ${error.comingFrom}:`, error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'startServer() method error:', error);
  }
}
