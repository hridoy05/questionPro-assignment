import { sequelize } from '@root/database';
import { DataTypes, Model, Optional } from 'sequelize';

// Define optional attributes for employee creation
type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'id' | 'child'>;

interface EmployeeAttributes {
  id: number;
  name: string;
  positionId: number;
  positionName: string;
  child?: Employee[]; // Self-referencing for hierarchical relationship
}

// Define the Employee model class
class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public positionId!: number;
  public positionName!: string;
  public child?: Employee[];

  public getChildren!: () => Promise<Employee[]>;
}

// Initialize the model
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'employees',
    sequelize,
    indexes: [
      {
        fields: ['positionId'],
      },
    ],
  }
);

// Define self-referential association
Employee.hasMany(Employee, {
  as: 'children',
  foreignKey: 'parentId',
  onDelete: 'CASCADE',
});

export { Employee };
