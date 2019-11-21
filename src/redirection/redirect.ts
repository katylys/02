import { Request, Response } from "express"
import { Db } from "mongodb"
import { RedirectionReq } from "../validation/validate"
import { Redirection } from "../types"
import { DB } from "../store/dbTypes"

export const Redirect = async (req: Request, resp: Response, db: Db) => {
    if (!RedirectionReq(req.params as Redirection.Request)) {
        return resp.status(400).send({
            message: 'not valid data',
        })
    }

    const existURL = await db.collection(DB.storeURLs).findOne({
        shortURL: req.params.shortURL,
    })

    if (!existURL) {
        return resp.status(400).send({
            message: 'no such short url'
        })
    }

    const updateUsage = await db.collection(DB.storeURLs).findOneAndUpdate({
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
    return resp.status(200)
}