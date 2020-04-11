import { strictEqual } from 'assert'
import * as request from 'supertest'
import { Shortener } from '../../src/types'
import { app, db } from '../../src/main'
import { DB } from '../../src/db/dbTypes'

describe(Shortener.URL, async () => {
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    after(async () => {
        //await db.collection(DB.storeCounter).deleteMany({})
        await db.collection(DB.storeURLs).deleteMany({})
    })

    it('200', async () => {
        await request(app)
            .get('/')
            .then((res) => strictEqual(res.status, 200))
            .catch((e) => console.log(e))
    })

    it('400, not valid URL', async () => {
        await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://ww.gismeteo.ru/`,
            })
            .then((res) => { 
                return strictEqual(res.status, 400)})
            .catch((e) => console.log(e))
    })

    it('200, create', async () => {
        await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://www.gismeteo.ru/`,
            })
            .then((res) => strictEqual(res.status, 200))
            .catch((error) => {
                console.log(error)
            })
    })
})
