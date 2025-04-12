import { TController } from "@http/shared/types";
import { AuthImplementationRepository } from "@infrastructure/implementation/auth/auth.implementation";
import { IAuthPromptlogin, IAuthPromptRegister } from "./auth.interfaces";
import { ILoginDTO } from "@infrastructure/dto/auth/login.dto";
import { IResponse } from "@shared/types";
import { IRegisterDTO } from "@infrastructure/dto/auth/register.dto";
import { EHttpCode } from "@http/shared/codes";

const repo = new AuthImplementationRepository()

export const postLogin: TController<IAuthPromptlogin> = async (_req, res) => {
  const form = res.locals.parsedData

  const user = {
    email: form.email,
    password: form.password
  } as ILoginDTO

  const [err, response] = await repo.login(user)

  if (err) {
    return res.status(err.status || 400).json(err)
  }

  return res.json({
    detail: 'Login successfull',
    data: response?.data
  } as IResponse);
};

export const postRegister: TController<IAuthPromptRegister> = async (_req, res) => {
  const form = res.locals.parsedData

  if (form.password !== form.confirmPassword) {
    return res.status(EHttpCode.BAD_REQUEST).json({
      status: EHttpCode.BAD_REQUEST,
      detail: 'Passwords must be the same'
    } as IResponse)
  }

  const user = {
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    password: form.password
  } as IRegisterDTO

  const [err] = await repo.register(user)

  if (err) {
    return res.status(err.status || EHttpCode.BAD_REQUEST).json(err)
  }

  return res.json({
    detail: 'Register successfull',
  } as IResponse);
};