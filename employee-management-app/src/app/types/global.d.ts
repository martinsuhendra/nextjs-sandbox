import { Connection, Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}
