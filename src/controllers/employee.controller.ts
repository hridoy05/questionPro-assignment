import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import EmployeeService = require('@root/services/employee.service')

export async function getEmployeeHierarchy(req: Request, res: Response): Promise<void> {
  try {
    const positionId = Number(req.params.positionId); // Extract positionId from request params
    const employeeHierarchy = await EmployeeService.getEmployeesUnderPosition(positionId); // Fetch hierarchy

    res.status(StatusCodes.OK).json({
      message: 'Employee hierarchy retrieved successfully',
      data: employeeHierarchy,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving employee hierarchy',
    });
  }
}
