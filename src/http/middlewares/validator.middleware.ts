import { IResponse, IResponseError } from "@shared/response";
import { RequestHandler } from "express";
import { ZodError, ZodObject } from "zod";
import { ICallableMiddleware } from "./middleware";
import { EHttpCode } from "@http/shared/codes";

const validatorMiddleware: ICallableMiddleware<ZodObject<any>> = (schema): RequestHandler => (req, res, next) => {
  try {
    schema.parse(req.body);
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
    return res.status(EHttpCode.INTERNAL_SERVER_ERROR).json({
      status: EHttpCode.BAD_REQUEST,
      detail: 'Internal server error',
    });
  }
};

export default validatorMiddleware;
