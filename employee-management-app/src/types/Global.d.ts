/* eslint-disable no-var */
import { Mongoose } from 'mongoose'

declare global {
  // eslint-disable-next-line vars-on-top
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<typeof import('mongoose')> | null
  }
}
