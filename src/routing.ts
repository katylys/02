import * as express from 'express'

import { Shorten } from './shortener/shorten'
import { MyURLs } from './list/myURLs'
import { GetStatistic } from './statistic/statistic'
import { Redirect } from './redirection/redirect'
import { Db } from 'mongodb'
import { Shortener, List, Statistic, Redirection } from './types'

export const getRouter = (db: Db) => {

    const router = express.Router()

    router.get('/', (_req, res) => {
        res.status(200).send({
            message: 'ok',
        })
    })
    router.get(Shortener.URL, (req, res) => Shorten(req, res, db))
    router.get(List.URL, (req, resp) => MyURLs(req, resp, db))
    router.get(Statistic.URL, (req, resp) => GetStatistic(req, resp, db))
    router.get(Redirection.URL, (req, resp) => Redirect(req, resp, db))

    return router
}
