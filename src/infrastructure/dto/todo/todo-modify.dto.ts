import { ITodoDTO } from "./todo.dto"

export interface ITodoCreateDTO {
  title: string
  description?: string
  autorId: string
  memberId: string
  deadLine?: Date
}

export interface ITodoUpdateDTO extends ITodoCreateDTO {
  status: ITodoDTO["status"]
}