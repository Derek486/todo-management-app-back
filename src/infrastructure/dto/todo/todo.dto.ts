import { IUserDTO } from "../user/user.dto"

export interface ITodoDTO {
  id: string
  title: string
  description?: string
  status: '0' | '1' | '2' | '3'
  autor?: IUserDTO
  member?: IUserDTO
  deadLine?: Date
  createdAt?: Date
  updatedAt?: Date
}