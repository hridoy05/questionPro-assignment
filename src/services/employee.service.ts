import {Employee} from '@root/models/employee';

export async function getEmployeesUnderPosition(positionId: number): Promise<Employee[] | undefined> {
  try {
    const employees: Employee[] = await Employee.findAll({
      where: { positionId },
      include: [
        {
          model: Employee,
          as: 'children', // Self-referencing to fetch the hierarchical children
          include: [
            {
              model: Employee,
              as: 'children', // Recursively fetch grandchildren, etc.
              include: [{ model: Employee, as: 'children' }],
            },
          ],
        },
      ],
    });
    return employees;
  } catch (error) {
    console.error(`Error retrieving employee hierarchy: ${error}`);
    return undefined;
  }
}
