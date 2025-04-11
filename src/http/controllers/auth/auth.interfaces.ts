import { ILoginBody, IRegisterBody } from "@http/request/auth/auth.request"

export interface IAuthPromptlogin {
  locals: { parsedData: ILoginBody }
}

export interface IAuthPromptRegister {
  locals: { parsedData: IRegisterBody }
}