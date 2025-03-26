import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo-modify.dto";
import { ITodoDTO } from "@infrastructure/dto/todo.dto";
import { TResponseRepo } from "@shared/types";

export abstract class TodoRepository {
  abstract getAllTodos(): Promise<TResponseRepo<ITodoDTO[]>>;
  abstract getTodoById(id: string): Promise<TResponseRepo<ITodoDTO>>;
  abstract createTodo(param: ITodoCreateDTO): Promise<TResponseRepo<ITodoDTO>>;
  abstract updateTodo(id: string, param: ITodoUpdateDTO): Promise<TResponseRepo<ITodoDTO>>;
  abstract partialUpdateTodo(id: string, param: Partial<ITodoUpdateDTO>): Promise<TResponseRepo<ITodoDTO>>;
  abstract deleteTodo(id: string): Promise<TResponseRepo<undefined>>;
}