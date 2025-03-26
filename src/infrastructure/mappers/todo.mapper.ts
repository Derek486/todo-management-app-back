import { Todo } from "@persistence/relations";
import { Mapper } from "./mapper";
import { ITodoDTO } from "@infrastructure/dto/todo.dto";

export class TodoMapper extends Mapper<Todo, ITodoDTO> {
  mapFrom(param: Todo): ITodoDTO {
    return {
      id: param.id,
      title: param.title,
      description: param.description,
      isComplete: !!param.isComplete,
    }
  }
}