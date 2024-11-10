import { getEmployeeHierarchy } from '@root/controllers/employee.controller';
import { positionIdSchema } from '@root/schemes/employeePosition';
import { authMiddleware } from '@root/shared/middleware/auth-middleware';
import { validate } from '@root/shared/middleware/validation-middleware';
import express, { Router } from 'express';

const router: Router = express.Router();

export function employeeRoutes(): Router {
  router.get('/employees/hierarchy/:positionId',validate(positionIdSchema), getEmployeeHierarchy);
  router.get('/employees/hierarchy/:positionId', authMiddleware.checkAuthentication,validate(positionIdSchema), getEmployeeHierarchy);
  return router;
}
