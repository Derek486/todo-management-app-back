import Todo from "./models/todo.model"
import User from "./models/user.model"

Todo.belongsTo(User, {
  foreignKey: 'autorId',
  as: 'autor',
});

Todo.belongsTo(User, {
  foreignKey: 'memberId',
  as: 'member',
});

export {
  Todo,
  User
}