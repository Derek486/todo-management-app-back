import { APP_EXPIRE_JWT, APP_KEY } from "src/config";
import jwt from 'jsonwebtoken'

export const generateToken = (data: any) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign({ data }, APP_KEY, { expiresIn: APP_EXPIRE_JWT as any }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}