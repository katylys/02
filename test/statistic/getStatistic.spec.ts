import * as request from 'supertest'
import { strictEqual, deepStrictEqual } from "assert"
import { Statistic, Shortener } from "../../src/types"
import { app, db } from "../../src/main"
import { DB } from "../../src/db/dbTypes"

describe(Statistic.URL, async () => {
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    after(async () => {
        //await db.collection(DB.storeCounter).deleteMany({})
        await db.collection(DB.storeURLs).deleteMany({})
    })
    it('200, start', async () => {
        await request(app)
            .get('/')
            .then((res) => strictEqual(res.status, 200))
            .catch((error) => console.log(error))
    })
    it('400, not valid data', async () => {
        await request(app)
            .get(Statistic.URL)
            .query({
                URL: 'a',
            })
            .then((res) => strictEqual(res.status, 400))
            .catch((error) => console.log(error))

    })
    it('404, url not found', async () => {
        await request(app)
            .get(Statistic.URL)
            .query({
                shortURL: 'a',
            })
            .then((res) => strictEqual(res.status, 404))
            .catch((error) => console.log(error))
    })
    it('200, statistic', async () => {
        const longURL = `https://www.gismeteo.ru/`
        let response1: Shortener.Response
        await request(app)
            .get(Shortener.URL)
            .query({
                longURL,
            })
            .then(async (resp) => {
                response1 = resp.body
                await request(app)
                    .get('/' + response1.shortURL)
                const res = await request(app)
                    .get(Statistic.URL)
                    .query({
                        shortURL: response1.shortURL,
                    })
                strictEqual(res.status, 200)
                const statistic: Statistic.Response = {
                    usage: 1
                }
                deepStrictEqual(res.body, statistic)
            })
            .catch((error) => console.log(error))
    })
    //const response1: Shortener.Response = requestShortURL.body
})
