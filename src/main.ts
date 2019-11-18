import { MongoClient, Db } from 'mongodb'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as createError from 'http-errors'
import { getRouter } from './routing'
import { DB } from './store/dbTypes'

export const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

export let db: Db
export const MONGOURL = 'mongodb://localhost:27017'
export const clientMongo = MongoClient.connect(MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(client => {
    db = client.db('Shortener02')
    client.db('Shortener02').collection(DB.storeCounter).insertOne({
      count: 1,
    })
    //client.db('Shortener02').collection(DB.storeURLs)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

app.use('/', getRouter())
app.use(function (_req, _res, next) {
  next(createError(404))
})
app.set('port', 4000)

export const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${app.get('port')}`)
})

process.on('SIGINT', () => {
  process.exit(1)
})


