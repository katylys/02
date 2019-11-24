import { Statistic, Shortener } from "../../src/types"
import * as request from 'supertest'
import { app, db } from "../../src/main"
import { strictEqual, deepStrictEqual } from "assert"
import { DB } from "../../src/db/dbTypes"

describe(Statistic.URL, async () => {
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    it('400, not valid data', async () => {
        const res = await request(app)
        .get(Statistic.URL)
        .query({
            URL: 'a',
        })
        strictEqual(res.status, 400)
    })
    it('404, url not found', async () => {
        const res = await request(app)
        .get(Statistic.URL)
        .query({
            shortURL: 'a',
        })
        strictEqual(res.status, 404)
    })
    it('200, statistic', async () => {
        const longURL = `https://www.gismeteo.ru/`
        const requestShortURL = await request(app)
            .get(Shortener.URL)
            .query({
                longURL,
            })
        const response1: Shortener.Response = requestShortURL.body
        await request(app)
            .get('/' + response1.shortURL)
        const res = await request(app)
        .get(Statistic.URL)
        .query({
            shortURL: response1.shortURL,
        })
        strictEqual(res.status, 200)
        console.log(res.body)
        const statistic: Statistic.Response = {
            usage: 1
        }
        deepStrictEqual(res.body, statistic)
    })
})