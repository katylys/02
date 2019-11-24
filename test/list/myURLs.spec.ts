import { List, Shortener } from "../../src/types"
import * as request from 'supertest'
import { app, db } from "../../src/main"
import { deepStrictEqual } from "assert"
import { DB } from "../../src/db/dbTypes"

describe(List.URL, () => {
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    it('200, empty list', async () => {
        const res = await request(app)
        .get(List.URL)
        deepStrictEqual(res.body, { myURLs: [] })
    })
    it('200, list', async () => {
        const longURL = `https://www.gismeteo.ru/`
        const requestShortURL = await request(app)
            .get(Shortener.URL)
            .query({
                longURL,
            })
        const response1: Shortener.Response = requestShortURL.body
        const list: List.Response = {
            myURLs: [{
                longURL,
                shortURL: response1.shortURL,
            }]
        }
        const res = await request(app)
        .get(List.URL)
        deepStrictEqual(res.body, list)
    })
})