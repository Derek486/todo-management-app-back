export interface ITodoDTO {
  id: string
  title: string
  description?: string
  isComplete: boolean
  createdAt?: Date
  updatedAt?: Date
}