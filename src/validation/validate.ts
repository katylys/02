import { Shortener, Redirection, Statistic } from "../types"
import { Validator } from 'class-validator'

const validator = new Validator()

export const ShortenerReq = (params: Shortener.Request): boolean => {
    return validator.isString(params.longURL)
}

export const RedirectionReq = (params: Redirection.Request): boolean => {
    return validator.isString(params.shortURL)
}

export const StatisticReq = (params: Statistic.Request): boolean => {
    return validator.isString(params.shortURL)
}
