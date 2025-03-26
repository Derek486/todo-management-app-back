import { RequestHandler } from "express";
import { ZodError, ZodObject } from "zod";
import { ICallableMiddleware } from "./middleware";
import { EHttpCode } from "@http/shared/codes";
import { IResponse, IResponseError } from "@shared/types";

const validatorMiddleware: ICallableMiddleware<ZodObject<any>> = (schema): RequestHandler => (req, res, next) => {
  try {
    const value = schema.parse(req.body);
    res.locals.parsedData = value
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors: IResponseError[] = err.errors.reduce((acc, issue) => {
        const property = issue.path.join(".");
        const existingError = acc.find((error) => error.property === property);

        if (existingError) {
          existingError.messages.push(issue.message);
        } else {
          acc.push({
            property,
            messages: [issue.message],
          });
        }

        return acc;
      }, [] as IResponseError[]);

      return res.status(EHttpCode.BAD_REQUEST).json({
        status: EHttpCode.BAD_REQUEST,
        detail: 'Validation error',
        errors,
      } as IResponse);
    }
  }
};

export default validatorMiddleware;
