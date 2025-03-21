import { DataTypes, Model, Optional } from 'sequelize';
import connection from '@persistence/connection';

interface ITareaAttributes {
  id: string;
  titulo: string;
  descripcion?: string;
  completado: boolean;
}

interface ITareaCreationAttributes extends Optional<ITareaAttributes, 'id' | 'descripcion'> { }

class Tarea extends Model<ITareaAttributes, ITareaCreationAttributes> implements ITareaAttributes {
  public id!: string;
  public titulo!: string;
  public completado!: boolean;
  public descripcion?: string;
}

Tarea.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: 'Tarea',
    tableName: 'tareas',
    timestamps: true,
  }
);

export default Tarea;