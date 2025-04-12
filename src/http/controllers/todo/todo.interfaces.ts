import { ITodoCreateBody, ITodoPartialBody, ITodoUpdateBody } from "@http/request/todos/todo-modify.request"
import { ITodosQuery } from "@http/request/todos/todos.request"
import { IAuthLocalsToken } from "../auth/auth.interfaces"

export interface ITodoPromptId {
  params: { id: string }
}

export interface ITodoPromptGetAll {
  query: ITodosQuery
}

export interface ITodoPromptPost {
  locals: { parsedData: ITodoCreateBody } & IAuthLocalsToken
}

export interface ITodoPromptPut extends ITodoPromptId {
  locals: { parsedData: ITodoUpdateBody } & IAuthLocalsToken
}

export interface ITodoPromptPartial extends ITodoPromptId {
  locals: { parsedData: ITodoPartialBody } & IAuthLocalsToken
}