import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo-modify.dto";
import { ITodoDTO } from "@infrastructure/dto/todo.dto";
import { TodoMapper } from "@infrastructure/mappers/todo.mapper";
import { TodoRepository } from "@infrastructure/repository/todo.repository";
import { Todo } from "@persistence/relations";

const mapper = new TodoMapper();

export class TodoImplementationRepository extends TodoRepository {
  async getAllTodos(): Promise<ITodoDTO[]> {
    const todos = await Todo.findAll();
    return todos.map(t => mapper.mapFrom(t));
  }
  async getTodoById(id: string): Promise<ITodoDTO> {
    const todo = await Todo.findOne({ where: { id }, rejectOnEmpty: true });
    return mapper.mapFrom(todo)
  }
  async createTodo(param: ITodoCreateDTO): Promise<ITodoDTO> {
    const todo = await Todo.create({
      description: param.description,
      title: param.title
    })

    return mapper.mapFrom(todo)
  }
  async updateTodo(id: string, param: ITodoUpdateDTO): Promise<ITodoDTO> {
    const todo = await Todo.findOne({ where: { id }, rejectOnEmpty: true });
    await todo.update({
      title: param.title,
      description: param.description,
      isComplete: param.isComplete,
    })
    return mapper.mapFrom(todo)
  }
  async partialUpdateTodo(id: string, param: Partial<ITodoUpdateDTO>): Promise<ITodoDTO> {
    const todo = await Todo.findOne({ where: { id }, rejectOnEmpty: true });
    await todo.update({
      title: param.title,
      description: param.description,
      isComplete: param.isComplete,
    })
    return mapper.mapFrom(todo)
  }
  async deleteTodo(id: string): Promise<undefined> {
    const todo = await Todo.findOne({ where: { id }, rejectOnEmpty: true });
    await todo.destroy()
  }
}