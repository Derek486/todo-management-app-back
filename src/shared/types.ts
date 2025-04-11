/**
 * Queries interfaces for HTTP controllers and middlewares
 */
export interface IQueryPaginate {
  page: string,
  pageSize: string,
}

/**
 * Response interfaces for HTTP controllers and middlewares
 */
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

/**
 * Response interfaces/types for infrastructure repositories
 */
export interface IResponseRepoData<D = any> {
  data: D
  meta?: any // Metadata to pagination, message, etc.
}

export type TResponseRepoError = {
  detail?: string
  status?: number
  errors?: IResponseError[]
}

export type TResponseRepo<D> = [TResponseRepoError?, IResponseRepoData<D>?]