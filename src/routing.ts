import { Shorten } from "./shortener/shorten";
import { MyURLs } from "./list/myURLs";
import { Statistic } from "./statistic/statistic";
import { Redirect } from "./redirection/redirect";
import { db } from "./main";
import * as express from 'express'

export const getRouter = () => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.status(200).send({
            message: 'ok',
        })
    })
    router.get('/shortener', (req, res) => Shorten(req, res, db))
    router.get('/myURLs', (req, resp) => MyURLs(req, resp, db))
    router.get('/statistic', (req, resp) => Statistic(req, resp, db))
    router.get('/:shortURL', (req, resp) => Redirect(req, resp, db))

    return router;
}