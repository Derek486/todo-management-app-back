export interface ITodoCreateDTO {
  title: string
  description?: string
}

export interface ITodoUpdateDTO extends ITodoCreateDTO {
  isComplete: boolean
}