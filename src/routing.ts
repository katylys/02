import { Shorten } from "./shortener/shorten"
import { MyURLs } from "./list/myURLs"
import { Redirect } from "./redirection/redirect"
import * as express from 'express'
import { Shortener, Statistic, Redirection, List } from "./types"
import { GetStatistic } from "./statistic/statistic"
import { db } from "./main"

export const getRouter = () => {

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