import { EHttpCode } from "@http/shared/codes";
import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo/todo-modify.dto";
import { ITodoDTO } from "@infrastructure/dto/todo/todo.dto";
import { TodoMapper } from "@infrastructure/mappers/todo.mapper";
import { TodoRepository } from "@infrastructure/repository/todo.repository";
import { getErrorsDB } from "@infrastructure/shared/lib";
import { Todo, User } from "@persistence/relations";
import { TResponseRepo } from "@shared/types";
import { BaseError } from "sequelize";

const mapper = new TodoMapper();

export class TodoImplementationRepository extends TodoRepository {
  async getAllTodos(): Promise<TResponseRepo<ITodoDTO[]>> {
    try {
      const todos = await Todo.findAll({
        include: [
          {
            model: User,
            as: 'member'
          },
          {
            model: User,
            as: 'autor'
          },
        ]
      });
      const data = todos.map(t => mapper.mapFrom(t))
      return [undefined, { data }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

  async getTodoById(id: string): Promise<TResponseRepo<ITodoDTO>> {
    try {
      const todo = await Todo.findOne({
        where: { id }, include: [
          {
            model: User,
            as: 'member'
          },
          {
            model: User,
            as: 'autor'
          },
        ]
      });

      if (!todo) {
        return [{
          detail: 'Todo not found',
          status: EHttpCode.NOT_FOUND
        }]
      }

      const data = mapper.mapFrom(todo)
      return [undefined, { data }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

  async createTodo(param: ITodoCreateDTO): Promise<TResponseRepo<ITodoDTO>> {
    try {
      const todo = await Todo.create({
        title: param.title,
        description: param.description,
        autorId: param.autorId,
        memberId: param.memberId,
        status: '0',
        deadLine: param.deadLine
      })

      const data = mapper.mapFrom(todo)
      return [undefined, { data }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

  async updateTodo(id: string, param: ITodoUpdateDTO): Promise<TResponseRepo<ITodoDTO>> {
    try {
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        return [{
          detail: 'Todo not found',
          status: EHttpCode.NOT_FOUND
        }]
      }

      await todo.update({
        title: param.title,
        description: param.description,
        deadLine: param.deadLine,
        memberId: param.memberId,
        status: param.status
      })
      const data = mapper.mapFrom(todo)
      return [undefined, { data }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

  async partialUpdateTodo(id: string, param: Partial<ITodoUpdateDTO>): Promise<TResponseRepo<ITodoDTO>> {
    try {
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        return [{
          detail: 'Todo not found',
          status: EHttpCode.NOT_FOUND
        }]
      }

      await todo.update({
        title: param.title,
        description: param.description,
        deadLine: param.deadLine,
        memberId: param.memberId,
        status: param.status
      })
      const data = mapper.mapFrom(todo)
      return [undefined, { data }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

  async deleteTodo(id: string): Promise<TResponseRepo<undefined>> {
    try {
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        return [{
          detail: 'Todo not found',
          status: EHttpCode.NOT_FOUND
        }]
      }
      
      await todo.destroy()
      return [];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }
}