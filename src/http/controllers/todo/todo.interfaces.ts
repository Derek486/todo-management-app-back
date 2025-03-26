import { ITodoCreateBody, ITodoPartialBody, ITodoUpdateBody } from "@http/request/todos/todo-modify.request"
import { ITodosQuery } from "@http/request/todos/todos.request"

export interface ITodoPromptId {
  params: { id: string }
}

export interface ITodoPromptGetAll {
  query: ITodosQuery
}

export interface ITodoPromptPost {
  locals: { parsedData: ITodoCreateBody }
}

export interface ITodoPromptPut extends ITodoPromptId {
  locals: { parsedData: ITodoUpdateBody }
}

export interface ITodoPromptPartial extends ITodoPromptId {
  locals: { parsedData: ITodoPartialBody }
}