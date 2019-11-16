import { Shortener, Redirection } from "../shortener/types";
import { Validator } from 'class-validator'

export const IsValidRequestShort = (params: Shortener.Request): boolean => {
    const validator = new Validator()
    return /* validator.isString(params.userID) &&  */validator.isString(params.longURL)
}

export  const IsValidReqRedirect = (params: Redirection.Request): boolean => {
    const validator = new Validator()
    return validator.isString(params.shortURL)
}
