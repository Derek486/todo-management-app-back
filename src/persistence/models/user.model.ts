import { DataTypes, Model, Optional } from 'sequelize';
import connection from '@persistence/connection';

interface IUserAttributes {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'firstName' | 'lastName'> { }

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  public id!: string;
  public email!: string;
  public firstName?: string;
  public lastName?: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.CHAR(48),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    lastName: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  }
);

export default User;