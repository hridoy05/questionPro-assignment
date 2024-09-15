import express, { Express } from 'express';
import { start } from '@root/server';
// import { databaseConnection } from '@root/database';

const initialize = (): void => {
  const app: Express = express();
  // databaseConnection();
  start(app);
};

initialize();
