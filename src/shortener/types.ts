export namespace Shortener {
    export type Request = {
        userID: string,
        longURL: string,
    }
    export type Response = {
        shortURL: string,
    }
}
export namespace Redirection {
    export type Request = {
        shortURL: string,
    }
    export type Response = void
}