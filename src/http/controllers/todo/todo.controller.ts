import { TodoImplementationRepository } from "@infrastructure/implementation/todo.implementation";
import { TController } from "../../shared/types";
import { ITodoPromptGetAll, ITodoPromptId, ITodoPromptPartial, ITodoPromptPost, ITodoPromptPut } from "./todo.interfaces";
import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo-modify.dto";
import { IResponse } from "@shared/types";

const repo = new TodoImplementationRepository()

export const getTodoById: TController<ITodoPromptId> = async (req, res) => {
  const [err, response] = await repo.getTodoById(req.params.id)

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({
    detail: 'Todos obtained',
    data: response?.data || []
  } as IResponse);
};

export const getTodos: TController<ITodoPromptGetAll> = async (_req, res) => {
  const [err, response] = await repo.getAllTodos();

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({
    detail: 'Todo obtained',
    data: response?.data
  } as IResponse);
};

export const postTodo: TController<ITodoPromptPost> = async (_req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
  } as ITodoCreateDTO

  const [err, response] = await repo.createTodo(todo)

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({
    detail: 'Todo created',
    data: response?.data
  } as IResponse);
};

export const putTodo: TController<ITodoPromptPut> = async (req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
    isComplete: res.locals.parsedData.isComplete,
  } as ITodoUpdateDTO

  const [err, response] = await repo.updateTodo(req.params.id, todo)

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({
    detail: 'Todo updated',
    data: response?.data
  } as IResponse);
};

export const patchTodo: TController<ITodoPromptPartial> = async (req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
    isComplete: res.locals.parsedData.isComplete,
  } as Partial<ITodoUpdateDTO>

  const [err, response] = await repo.partialUpdateTodo(req.params.id, todo)

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({ 
    detail: 'Todo partial updated',
    data: response?.data 
  } as IResponse);
};

export const deleteTodo: TController<ITodoPromptId> = async (req, res) => {
  const [err] = await repo.deleteTodo(req.params.id)

  if (err) {
    return res.status(400).json(err)
  }

  return res.json({ detail: "Todo deleted" } as IResponse);
};
