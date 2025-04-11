import { AuthRequest } from "@http/request/auth/auth.request";
import { EHttpCode } from "@shared/codes";
import { IMiddleware } from "@shared/middleware";
import { SERVER_ERROR_RESPONSE, SERVER_NOTAUTH_RESPONSE } from "@shared/response";
import { RequestHandler } from "express";
import { APP_KEY } from "src/config";
import jwt from 'jsonwebtoken'

const authMiddleware: IMiddleware<AuthRequest> = (req, res, next) => {
  try {
    const authString = req.headers.authorization
    if (authString) {
      const token = authString.split(' ')[1]
      jwt.verify(token, APP_KEY, (err: any, value: any) => {
        if (err) return res.status(EHttpCode.NOT_AUTH).json(SERVER_NOTAUTH_RESPONSE);
        req.user = value.data
        return next();
      })
    } else {
      res.status(EHttpCode.NOT_AUTH).json(SERVER_NOTAUTH_RESPONSE);
    }
  } catch (err) {
    res.status(EHttpCode.SERVER_ERROR).json(SERVER_ERROR_RESPONSE);
  }
};

export default authMiddleware as RequestHandler;