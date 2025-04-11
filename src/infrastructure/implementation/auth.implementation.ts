import { ILoginDTO } from "@infrastructure/dto/auth/login.dto";
import { IRegisterDTO } from "@infrastructure/dto/auth/register.dto";
import { AuthRepository } from "@infrastructure/repository/auth.repository";
import { getErrorsDB } from "@infrastructure/shared/lib";
import { User } from "@persistence/relations";
import { TResponseRepo } from "@shared/types";
import { BaseError } from "sequelize";
import { EHttpCode } from "@http/shared/codes";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_EXPIRE_JWT, APP_KEY } from "src/config";

export class AuthImplementationRepository extends AuthRepository {

  async login(form: ILoginDTO): Promise<TResponseRepo<string>> {
    try {
      const user = await User.findOne({ where: { email: form.email }, rejectOnEmpty: true });
      const isValidPassword = await bcrypt.compare(form.password, user.password)
      
      if (!isValidPassword) {
        return [
          {
            detail: 'Invalid password',
            status: EHttpCode.UNAUTHORIZED
          }, undefined
        ]
      }

      return [undefined, {
        data: jwt.sign(user.id, APP_KEY, {
          expiresIn: APP_EXPIRE_JWT as any
        })
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