import { Request, Response } from "express";
import { Db } from "mongodb";
import { RedirectionReq } from "../validation/validate";
import { Redirection } from "../shortener/types";

export const Redirect = async (req: Request, resp: Response, db: Db) => {
    if (!RedirectionReq(req.params as Redirection.Request)) {
        return resp.status(400).send({
            message: 'not valid data',
        })
    }

    const existURL = await db.collection('URLs').findOne({
        shortURL: req.params.shortURL,
    })

    if (!existURL) {
        return resp.status(400).send({
            message: 'no such short url'
        })
    }

    const updateUsage = await db.collection('URLs').findOneAndUpdate({
        shortURL: req.params.shortURL,
    },
        {
            $inc: {
                usage: 1,
            },
        })
    if (!updateUsage) {
        return resp.status(500).send({
            message: 'error of db'
        })
    }
    resp.redirect(existURL.longURL)
}