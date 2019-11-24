import { ShortenerReq } from '../validation/validate'
import { Request, Response } from 'express'
import { Db } from 'mongodb'
import { DB } from '../db/dbTypes'
import nanoid = require('nanoid')

export const Shorten = async (req: Request, resp: Response, db: Db) => {
    const isValid = await ShortenerReq(req.query)
    if (!isValid) {
        return resp.status(400).send({
            message: 'Not valid data',
        })
    }

    const existURL = await db.collection<DB.URLs>(DB.storeURLs).findOne({ longURL: req.query.longURL })

    if (existURL) {
        return resp.status(200).send({
            shortURL: existURL.shortURL,
        })
    }

    const counter = await db.collection<DB.Counter>(DB.storeCounter).findOne({})
    if (!counter) {
        return resp.status(500).send({
            message: 'error of db',
        })
    }
    let shortURL = nanoid(counter.count)
    const existShortURL = await db.collection<DB.URLs>(DB.storeURLs).findOne({ shortURL })

    if (existShortURL) {
        const updateCounter = await db.collection<DB.Counter>(DB.storeCounter).findOneAndUpdate({}, {
            $inc: {
                counter: 1,
            },
        },
            { returnOriginal: false },
        )
        if (!updateCounter.value) {
            return resp.status(500).send({
                message: 'Error of db',
            })
        }
        shortURL = nanoid(updateCounter.value.count)
    }
    const insertURL = await db.collection<DB.URLs>(DB.storeURLs).insertOne({
        longURL: req.query.longURL,
        shortURL,
        usage: 0,
        maker: req.ip,
    })
    if (!insertURL) {
        return resp.status(500).send({
            message: 'Error of db',
        })
    }
    return resp.status(200).send({ shortURL })
}
