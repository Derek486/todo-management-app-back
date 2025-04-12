import { RequestHandler } from "express";
import { APP_KEY } from "src/config";
import jwt from 'jsonwebtoken'
import { IMiddleware } from "./middleware";
import { EHttpCode } from "@http/shared/codes";
import { IResponse } from "@shared/types";

const authMiddleware: IMiddleware = (req, res, next) => {
  try {
    const authString = req.headers.authorization
    if (authString) {
      const token = authString.split(' ')[1]
      return jwt.verify(token, APP_KEY, (err: any, value: any) => {
        if (err) return res.status(EHttpCode.UNAUTHORIZED).json({
          status: EHttpCode.UNAUTHORIZED,
          detail: 'Unauthorized request'
        } as IResponse);
        res.locals.authUserId = value.data
        return next();
      })
    } else {
      return res.status(EHttpCode.UNAUTHORIZED).json({
        status: EHttpCode.UNAUTHORIZED,
        detail: 'Unauthorized request'
      } as IResponse);
    }
  } catch (err) {
    return res.status(EHttpCode.INTERNAL_SERVER_ERROR).json({
      status: EHttpCode.INTERNAL_SERVER_ERROR,
      detail: 'Internal server error'
    } as IResponse);
  }
};

export default authMiddleware as RequestHandler;