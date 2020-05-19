import supertest = require("supertest")
import * as request from 'supertest'
import { deepStrictEqual, strictEqual } from "assert"
import { List, Shortener } from "../../src/types"
import { app, db } from "../../src/main"
import { DB } from "../../src/db/dbTypes"

describe(List.URL, async () => {
    afterEach(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
    })
    after(async () => {
        await db.collection(DB.storeURLs).deleteMany({})
        //await db.collection(DB.storeURLs).deleteMany({})
    })
    it('for start tests', async () => {
        await supertest(app)
            .get('')
    })

    it('200', async () => {
        await supertest(app)
            .get('')
            .then((res) => strictEqual(res.status, 200))
            .catch((e) => console.log(e))
    })
    
    it('200, empty list', async () => {
        await request(app)
        .get(List.URL)
        .then((res) => deepStrictEqual(res.body, { myURLs: [] }))
        .catch((error) => console.log(error))
        
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