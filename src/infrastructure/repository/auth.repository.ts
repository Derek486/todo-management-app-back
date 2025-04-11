import { ILoginDTO } from "@infrastructure/dto/auth/login.dto";
import { IRegisterDTO } from "@infrastructure/dto/auth/register.dto";
import { TResponseRepo } from "@shared/types";

export abstract class AuthRepository {
  abstract login(form: ILoginDTO): Promise<TResponseRepo<string>>;
  abstract register(form: IRegisterDTO): Promise<TResponseRepo<void>>;
}