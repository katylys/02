export namespace Shortener {
    export const URL = '/shortener'
    export type Request = {
        userID: string,
        longURL: string,
    }
    export type Response = {
        shortURL: string,
    }
}
export namespace Redirection {
    export const URL = '/:shortURL'
    export type Request = {
        shortURL: string,
    }
    export type Response = void
}

export namespace Statistic {
    export const URL = '/statistic'
    export type Request = {
        shortURL: string,
    }
    export type Response = {
        usage: number,
    }
}

export namespace List {
    export const URL = '/myURLs'
    export type Request = void
    export type Response = {
        myURLs: {
            longURL: string,
            shortURL: string,
        }[]
    }
}
