import { NextApiRequest, NextApiResponse } from 'next'
import { NotFoundException, RouterBuilder } from 'next-api-handler'

import { getUsers, postUser } from '@/app/features/employee/server/controller'
import connectMongo from '@/common/server/database/conn'
import withError from '@/common/utils/middleware/withError'

// eslint-disable-next-line no-console

const router = new RouterBuilder()

const connectHandler = async (_req: NextApiRequest, _res: NextApiResponse) => {
  const response = await connectMongo()
  if (response.connection.readyState !== 1) {
    throw new NotFoundException()
  }
  return response
}

router.use(connectHandler)
router.get(withError(getUsers))
router.post(withError(postUser))

export default router.build()
