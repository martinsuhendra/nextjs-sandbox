import { NextApiRequest, NextApiResponse } from 'next';
import { RouterBuilder } from 'next-api-handler';
import connectMongo from '@/database/conn';
import { deleteUser, getUsers, postUser } from '@/database/controller';

connectMongo().catch((err) => console.log(`Error in connection: ${err}`));

const router = new RouterBuilder();

router.get(async (req, res) => await getUsers(req, res));
router.post(async (req, res) => await postUser(req, res));
router.delete(async (req, res) => await deleteUser(req, res));

export default router.build();
