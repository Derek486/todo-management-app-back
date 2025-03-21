import { NextFunction, Request, RequestHandler, Response } from "express";

export type ICallableMiddleware<T> = (params: T) => RequestHandler
export type IMiddleware<R extends Request = Request> = (req: R, res: Response, next: NextFunction) => void