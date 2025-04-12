import { Todo } from "@persistence/relations";
import { Mapper } from "./mapper";
import { ITodoDTO } from "@infrastructure/dto/todo/todo.dto";

export class TodoMapper extends Mapper<Todo, ITodoDTO> {
  mapFrom(param: Todo): ITodoDTO {
    return {
      id: param.id,
      title: param.title,
      description: param.description,
      status: param.status,
      autor: param.autor !== undefined ? {
        id: param.autor.id,
        email: param.autor.email,
        firstName: param.autor.firstName,
        lastName: param.autor.lastName,
      } : undefined,
      member: param.member !== undefined ? {
        id: param.member.id,
        email: param.member.email,
        firstName: param.member.firstName,
        lastName: param.member.lastName,
      } : undefined,
      deadLine: param.deadLine,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    }
  }
}