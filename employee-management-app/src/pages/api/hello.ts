import connectMongo from '../../../database/conn';

export default function handler() {
  connectMongo();
}
