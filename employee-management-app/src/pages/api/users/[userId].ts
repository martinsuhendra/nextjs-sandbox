import { RouterBuilder } from 'next-api-handler'

import {
  deleteUser,
  getUser,
  putUser,
} from '@/app/features/employee/server/controller'
import withError from '@/common/utils/middleware/withError'

const router = new RouterBuilder()

router.get(withError(getUser))
router.put(withError(putUser))
router.delete(withError(deleteUser))

export default router.build()
