import { RequestHandler } from "express";

type InferQuery<T> = T extends { query: infer Q } ? Q : qs.ParsedQs;
type InferParams<T> = T extends { params: infer P } ? P : {};
type InferBody<T> = T extends { body: infer B } ? B : any;
type InferRes<T> = T extends { response: infer R } ? R : any;
type InferLocals<T> = T extends { locals: infer L }
  ? L extends Record<string, any>
  ? L
  : Record<string, any>
  : Record<string, any>;

export type TController<
  T = {},
> = RequestHandler<
  InferParams<T>,
  InferRes<T>,
  InferBody<T>,
  InferQuery<T>,
  InferLocals<T>
>;