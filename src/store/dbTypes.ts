import { ObjectID } from "bson"

export namespace DB {
    export const storeURLs = 'URLs'
    export type URLs = {
        _id: ObjectID,
        longURL: string,
        shortURL: string,
        maker: string,
        usage: number | 0,
    }
    export const storeUsers = 'Users'
    export type User = {
        _id: ObjectID,
        userID: string,
        URLs: ObjectID[],
    }
    export const storeCounter = 'Counter'
    export type Counter = {
        _id: ObjectID,
        count: number | 1,
    }
}