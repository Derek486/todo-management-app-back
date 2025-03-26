import { TodoImplementationRepository } from "@infrastructure/implementation/todo.implementation";
import { TController } from "../../shared/types";
import { ITodoPromptGetAll, ITodoPromptId, ITodoPromptPartial, ITodoPromptPost, ITodoPromptPut } from "./todo.interfaces";
import { ITodoCreateDTO, ITodoUpdateDTO } from "@infrastructure/dto/todo-modify.dto";

const repo = new TodoImplementationRepository()

export const getTodoById: TController<ITodoPromptId> = async (req, res) => {
  const todo = await repo.getTodoById(req.params.id)

  return res.json({
    data: todo
  });
};

export const getTodo: TController<ITodoPromptGetAll> = async (_req, res) => {
  const todos = await repo.getAllTodos();

  return res.json({ data: todos });
};

export const postTodo: TController<ITodoPromptPost> = async (_req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
  } as ITodoCreateDTO

  const data = await repo.createTodo(todo)

  return res.json({ data });
};

export const putTodo: TController<ITodoPromptPut> = async (req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
    isComplete: res.locals.parsedData.isComplete,
  } as ITodoUpdateDTO

  const data = await repo.updateTodo(req.params.id, todo)

  return res.json({ data });
};

export const patchTodo: TController<ITodoPromptPartial> = async (req, res) => {
  const todo = {
    title: res.locals.parsedData.title,
    description: res.locals.parsedData.description,
    isComplete: res.locals.parsedData.isComplete,
  } as Partial<ITodoUpdateDTO>

  const data = await repo.partialUpdateTodo(req.params.id, todo)

  return res.json({ data });
};

export const deleteTodo: TController<ITodoPromptId> = async (req, res) => {
  await repo.deleteTodo(req.params.id)

  return res.json({ message: "Deleted" });
};
