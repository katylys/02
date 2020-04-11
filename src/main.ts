import { MongoClient, Db } from 'mongodb'
import * as createError from 'http-errors'
import { Server } from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import { getRouter } from './routing'
import { DB } from './db/dbTypes'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//export let db: Db
export const MONGOURL = 'mongodb://mongo:27017'
export const mongoDbPromise = MongoClient.connect(MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
.then((cl: MongoClient) => cl)

console.log(mongoDbPromise)

export let db: Db
export let server: Server

mongoDbPromise
  .then(async (client) => {
    db = client.db('Shortener02')
    await db.collection(DB.storeCounter)
      .insertOne({
        count: 1,
      })
      .catch((error) => console.error(error))
    db.collection(DB.storeURLs)

    app.use('/', getRouter(db))
    app.use((_req, _res, next) => {
      next(createError(404))
    })

    app.set('port', 4000)

    server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${app.get('port')}`)
    })
    return client
  }).catch((error) => {
    console.error(error)
    process.exit(1)
  })

console.log(mongoDbPromise)

//export const db = Promise.all([mongoDbPromise]).then((db) => db).catch((error) => console.log(error))

process.on('SIGINT', () => {
  process.exit(1)
})
