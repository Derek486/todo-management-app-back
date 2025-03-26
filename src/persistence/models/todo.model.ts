import { DataTypes, Model, Optional } from 'sequelize';
import connection from '@persistence/connection';

interface ITodoAttributes {
  id: string;
  title: string;
  description?: string;
  isComplete?: boolean;
}

interface ITodoCreationAttributes extends Optional<ITodoAttributes, 'id' | 'description' | 'isComplete'> { }

class Todo extends Model<ITodoAttributes, ITodoCreationAttributes> implements ITodoAttributes {
  public id!: string;
  public title!: string;
  public isComplete?: boolean;
  public description?: string;
}

Todo.init(
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
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: 'Todo',
    tableName: 'Todos',
    timestamps: true,
  }
);

export default Todo;