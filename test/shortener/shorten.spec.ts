import { Shortener } from "../../src/types"
import * as request from 'supertest'
import { app } from "../../src/main"
import { strictEqual } from "assert"

describe(Shortener.URL, async () => {
    it('200, create', async () => {
        /* const request: Request = {
            query: {
                
            }
        } */
        const res = await request(app)
            .get(Shortener.URL)
            .query({
                longURL: `https://www.gismeteo.ru/`,
            })
        //console.log(res)
        strictEqual(res.status, 200)
        //strictEqual(res.body, { shortURL: 'A' })
    })
})
