import { Application } from 'express';
import { healthRoutes } from '@root/routes/health';

// const BASE_PATH = '/api/v1';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
};
