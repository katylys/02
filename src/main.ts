import { MongoClient, Db } from 'mongodb'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as createError from 'http-errors'

import { getRouter } from './routing'
import { Server } from 'http'


export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//export let db: Db
export const MONGOURL = 'mongodb://localhost:27017'
export const mongoDbPromise = MongoClient.connect(MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((client) => {
    return client
  })
  .catch((e) => { throw e })

export let db: Db
export let server: Server

mongoDbPromise.then(async (client) => {
  db = client.db('Shortener02')
  await db.collection('Counter').insertOne({
    count: 1,
  }).catch((error) => console.error(error))

  app.use('/', getRouter(db))
  app.use((_req, _res, next) => {
    next(createError(404))
  })

  app.set('port', 4000)

  server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${app.get('port')}`)
  })
}).catch((error) => {
  console.error(error)
  return process.exit(1)
})

//export const db = Promise.all([mongoDbPromise]).then((db) => db).catch((error) => console.log(error))

process.on('SIGINT', () => {
  process.exit(1)
})
