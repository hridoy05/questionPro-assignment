import { health } from '@root/controllers/health';
import express, { Router } from 'express';

const router: Router = express.Router();

export function healthRoutes(): Router {
  router.get('/server-health', health);

  return router;
}
