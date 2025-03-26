import { TResponseRepoError } from "@shared/types";
import { BaseError, UniqueConstraintError } from "sequelize";

export function getErrorsDB(err: BaseError): TResponseRepoError {
  if (err instanceof UniqueConstraintError) {
    console.log("UNIQUE ERROR");
    console.log(err.fields);
    console.log(err.errors);
  }

  return {
    detail: 'An error has occurred'
  }
}