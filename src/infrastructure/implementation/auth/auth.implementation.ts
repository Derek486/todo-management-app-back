import { ILoginDTO } from "@infrastructure/dto/auth/login.dto";
import { IRegisterDTO } from "@infrastructure/dto/auth/register.dto";
import { AuthRepository } from "@infrastructure/repository/auth.repository";
import { getErrorsDB } from "@infrastructure/shared/lib";
import { User } from "@persistence/relations";
import { TResponseRepo } from "@shared/types";
import { BaseError } from "sequelize";
import { EHttpCode } from "@http/shared/codes";
import bcrypt from 'bcrypt'
import { generateToken } from "@shared/lib";

export class AuthImplementationRepository extends AuthRepository {

  async login(form: ILoginDTO): Promise<TResponseRepo<string>> {
    try {
      const user = await User.findOne({ where: { email: form.email } });

      if (!user) {
        return [{
          detail: 'User not found',
          status: EHttpCode.NOT_FOUND
        }]
      }

      const isValidPassword = await bcrypt.compare(form.password, user.password)

      if (!isValidPassword) {
        return [{
          detail: 'Invalid password',
          status: EHttpCode.UNAUTHORIZED
        }]
      }

      return [undefined, {
        data: (await generateToken(user.id))!
      }];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }
  async register(form: IRegisterDTO): Promise<TResponseRepo<void>> {
    try {
      await User.create({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: await bcrypt.hash(form.password, 10),
      })
      return [undefined];
    } catch (err) {
      console.log(err);
      return [getErrorsDB(err as BaseError)]
    }
  }

}