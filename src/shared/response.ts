export interface IResponseError {
  property: string,
  messages: string[]
}

export interface IResponse<D = any> {
  status: number,
  detail?: string,
  data?: D,
  errors?: IResponseError[]
}

export interface IResponsePaginate<T = any> extends IResponse<{
  page: number,
  pageSize: number,
  totalSize: number,
  totalPages: number,
  records: T[]
}> { }