import { Request, Response } from "express";
import { Db } from "mongodb";
import { DB } from "../store/dbTypes";

export const MyURLs = async (req: Request, resp: Response, db: Db) => {
    const userIp = req.ip
    const cursor = await db.collection<DB.URLs>('URLs').find({
        maker: userIp,
    })
    if (!cursor) {
        return resp.status(200).send({
            URLs: [],
        })
    }
    const listURLs = await cursor.toArray()
    const myURLs = listURLs.map((field) => {
        return {
            longURL: field.longURL,
            shortURL: field.shortURL,
        }
    })
    return resp.status(200).send({
        myURLs,
    })
}