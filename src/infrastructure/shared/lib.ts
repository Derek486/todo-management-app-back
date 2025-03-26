import { IResponseError, TResponseRepoError } from "@shared/types";
import { BaseError, UniqueConstraintError } from "sequelize";

export function getErrorsDB(err: BaseError): TResponseRepoError {
  let errors: IResponseError[] = []

  if (err instanceof UniqueConstraintError) {
    const properties = Object.keys(err.fields)
    properties.forEach(p => {
      errors.push({
        messages: (err.errors.filter(e => e.path === p)).map(e => e.message),
        property: p
      })
    })
  }

  return {
    detail: 'An error has occurred',
    errors
  }
}