import { EHttpCode } from "@http/shared/codes";
import { IResponse } from "@shared/response";
import { Request, RequestHandler, Response } from "express";

type TController = <T extends Request = Request>(controller: (req: T, res: Response) => Promise<void | Response>) => RequestHandler;

export const executeController: TController = (controller) => async (req, res) => {
  try {
    return await controller(req as any, res)
  } catch (err: any) {
    console.log(err.message);
    return res.status(EHttpCode.INTERNAL_SERVER_ERROR).json({
      status: EHttpCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    } as IResponse)
  }
}