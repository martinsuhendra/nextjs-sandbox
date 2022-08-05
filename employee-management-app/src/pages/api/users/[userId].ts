import connectMongo from '../../../../database/conn';
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from '../../../../database/controller';

export default async function handler(req: any, res: any) {
  connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in Connection' }),
  );

  //type of request
  const { method } = req;

  switch (method) {
    case 'GET':
      getUser(req, res);
      // res.status(200).json({ method, name: 'GET REQUEST' });
      break;

    case 'PUT':
      putUser(req, res);
      // res.status(200).json({ method, name: 'PUT REQUEST' });
      break;
    case 'DELETE':
      deleteUser(req, res);
      // res.status(200).json({ method, name: 'DELETE REQUEST' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
