import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import connection from '@persistence/connection';
import User from './user.model';

interface ITaskAttributes {
  id: string;
  title: string;
  description?: string;
  status: '0' | '1' | '2' | '3';
  autorId: string;
  memberId: string;
  deadLine?: Date;
}

interface ITaskCreationAttributes extends Optional<ITaskAttributes, 'id' | 'description' | 'deadLine'> { }

class Task extends Model<ITaskAttributes, ITaskCreationAttributes> implements ITaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: '0' | '1' | '2' | '3';
  public autorId!: string;
  public autor?: User;
  public memberId!: string;
  public member?: User;
  public deadLine?: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0', '1', '2', '3'),
      defaultValue: '0',
    },
    deadLine: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    autorId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      }
    },
    memberId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      }
    },
  },
  {
    sequelize: connection,
    modelName: 'Task',
    tableName: 'Tasks',
    timestamps: true,
  }
);

export default Task;