import { Shortener } from '../../src/types'
import * as request from 'supertest'
import { app, db } from '../../src/main'
import { strictEqual } from 'assert'
import { DB } from '../../src/db/dbTypes'

describe(Shortener.URL, () => {
    /* setTimeout(() => run(), 5000) */
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })

    it('200', async () => {
        const res = await request(app)
            .get('/')
        strictEqual(res.status, 200)
    })

    it('400, not valid URL', async () => {
        const res = await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://ww.gismeteo.ru/`,
            })
        strictEqual(res.status, 400)
    })

    it('200, create', async () => {
        await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://www.gismeteo.ru/`,
            }).then((res) => strictEqual(res.status, 200)).catch((error) => {
                console.log(error)
            })
    })
})
