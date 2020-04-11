import * as supertest from 'supertest'
import { server } from './../src/main'
import { Shortener, Statistic, Redirection, List } from '../src/types'

export const createGetTester = (url: string) => {
    return (q: any, status: number, res?: any) => {
      const r = supertest(server)
        .get(url)
        .query(q)

      if (res != null) {
        return r.expect(status, res)
      }
      return r.expect(status)
    }
  }
export const testShortenner = createGetTester(Shortener.URL)
export const testStatistic = createGetTester(Statistic.URL)
export const testRedirection = createGetTester(Redirection.URL)
export const testList = createGetTester(List.URL)
