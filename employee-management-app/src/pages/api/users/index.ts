import { RouterBuilder } from 'next-api-handler'

import connectMongo from '@/app/features/employee/server/database/conn'
import {
  deleteUser,
  getUsers,
  postUser,
} from '@/app/features/employee/server/database/controller'

// eslint-disable-next-line no-console
connectMongo().catch((error) => console.log(error))

const router = new RouterBuilder()

router.get(async (req, res) => getUsers(req, res))
router.post(async (req, res) => postUser(req, res))
router.delete(async (req, res) => deleteUser(req, res))

export default router.build()
