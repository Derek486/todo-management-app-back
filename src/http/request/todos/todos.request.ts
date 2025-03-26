import { IQueryPaginate } from "@shared/types";

export interface ITodosQuery extends qs.ParsedQs, IQueryPaginate {
  isComplete?: string,

  // search value
  title?: string,
}