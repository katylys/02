import { DB } from "./dbTypes";
import { Collection, Db, ObjectID, FilterQuery, MongoError, CollectionInsertManyOptions } from "mongodb";
import { Context } from "koa";
import * as createHttpError from 'http-errors'

export class Session {
    static Stores: Context['Stores']
  
    constructor(
      readonly userId: ObjectID,
    ) { }
  
    /* user() {
      return Session.Stores.UsersStore
        .findOne(this.userId)
        .then((u) => {
          if (u && !u.deleted) {
            return u
          }
          throw createHttpError(401)
        })
    } */
  }


type WithId = { _id?: ObjectID }

export class MongoBaseStore<TForInsert> {
    protected collection: Collection<TForInsert & WithId>

    constructor(mongo: Db, collectionName: string) {
        this.collection = mongo.collection(collectionName)
    }
}


export class URLsStore extends MongoBaseStore<DB.URLs> {
    findURL(longURL: string) {
        const filter: Pick<DB.URLs, 'longURL'> = { longURL }
        return this.collection.findOne(filter)
    }
}

export class CounterStore extends MongoBaseStore<DB.Counter> {
    insertCounter() {
        return this.collection.insert({
            count: 1,
        })
    }
    incrementCounter() {
        return this.collection.update({}, {
            $inc: {
                count: 1,
            }
        })
    }
}

export class UsersStore extends MongoBaseStore<DB.User> {
    
}