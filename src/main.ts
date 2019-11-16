import { MongoClient, Db } from 'mongodb'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Shorten } from './shortener/shorten';
import { Redirect } from './redirection/redirect';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let db: Db
export const MONGOURL = 'mongodb://localhost:27017'
export const clientMongo = MongoClient.connect(MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(client => {
    db = client.db('Shortener02')
    client.db('Shortener02').collection('Counter').insertOne({
      count: 1,
    })
    client.db('Shortener02').collection('URLs')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

//app//.use(router.routes())
//.use(router.allowedMethods())
//  .use(bodyParser())

/* app.use('/', (req, res) => {
  res.status(200).send({
    message: 'ok',
  })
}) */

app.use('/shortener', (req, res) => Shorten(req, res, db))
app.use('/:shortURL', (req, resp) => Redirect(req, resp, db))
app.set('port', 4000)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${app.get('port')}`);
})

process.on('SIGINT', () => {
  process.exit(1)
})


