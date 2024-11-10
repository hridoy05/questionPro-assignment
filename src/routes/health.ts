import { health } from '@root/controllers/health';
import express, { Router } from 'express';

const router: Router = express.Router();
/* GET health status. */
/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Application Related API
 * /server-health:
 *   get:
 *     tags: [Application]
 *     summary: Health Check of Server
 *     description: Health Check of API Server
 *     responses:
 *       200:
 *         description: Status Okay
*/
export function healthRoutes(): Router {
  router.get('/server-health', health);

  return router;
}
