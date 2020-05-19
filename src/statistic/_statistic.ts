import { Request, Response } from "express";
import { Db } from "mongodb";
import { StatisticReq } from "../validation/validate";
import { DB } from "../store/dbTypes";

export const Statistic = async (req: Request, resp: Response, db: Db) => {
    if (!StatisticReq(req.query)) {
        return resp.status(400).send({
            message: 'not valid dara',
        })
    }
    const usage = await db.collection<DB.URLs>('URLs').findOne(
        {
            shortURL: req.query.shortURL,
        },
        {
            projection: {
                usage: 1,
            },
        })

    if (!usage) {
        return resp.status(404).send({
            message: 'no such url',
        })
    }
    return resp.status(200).send({
        usage: usage.usage,
    })
}