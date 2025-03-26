import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo-modify.dto";
import { ITodoDTO } from "@infrastructure/dto/todo.dto";

export abstract class TodoRepository {
  abstract getAllTodos(): Promise<ITodoDTO[]>;
  abstract getTodoById(id: string): Promise<ITodoDTO>;
  abstract createTodo(param: ITodoCreateDTO): Promise<ITodoDTO>;
  abstract updateTodo(id: string, param: ITodoUpdateDTO): Promise<ITodoDTO>;
  abstract partialUpdateTodo(id: string, param: Partial<ITodoUpdateDTO>): Promise<ITodoDTO>;
  abstract deleteTodo(id: string): Promise<undefined>;
}