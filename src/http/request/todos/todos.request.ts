import { IQueryPaginate } from "@shared/interfaces";

export interface ITodosQuery extends qs.ParsedQs, IQueryPaginate {
  isComplete?: string,

  // search value
  title?: string,
}