import { Validator } from 'class-validator'
import * as request from 'request-promise'

import { Shortener, Redirection, Statistic } from '../types'

const validator = new Validator()

const IsValidURL = async (URL: string) => {
    const resp = await request(URL).catch((_error) => false)
    return resp ? true : false
}

export const ShortenerReq = async (params: Shortener.Request): Promise<boolean> => {
    return validator.isString(params.longURL) && await IsValidURL(params.longURL)
}

export const RedirectionReq = (params: Redirection.Request): boolean => {
    return validator.isString(params.shortURL)
}

export const StatisticReq = (params: Statistic.Request): boolean => {
    return validator.isString(params.shortURL)
}
