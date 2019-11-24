import { Redirection, Shortener } from "../../src/types"
import { db, app } from "../../src/main"
import { DB } from "../../src/db/dbTypes"
import * as request from 'supertest'
import { strictEqual } from "assert"

describe(Redirection.URL, () => {
    //setTimeout(() => run(), 6000)
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    it('400, not found', async () => {
        const res = await request(app)
            .get('/' + 'a')
        strictEqual(res.status, 400)
    })
    it('302, success redirection', async () => {
        const requestShortURL = await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://www.gismeteo.ru/`,
            })
        const response1: Shortener.Response = requestShortURL.body
        const response2 = await request(app)
            .get('/' + response1.shortURL)
        strictEqual(response2.status, 302)
    })
})