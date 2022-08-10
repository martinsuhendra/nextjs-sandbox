import { RouterBuilder } from 'next-api-handler'

import {
  deleteUser,
  getUser,
  putUser,
} from '@/app/features/employee/server/database/controller'

const router = new RouterBuilder()

router.get(getUser)
router.put(putUser)
router.delete(deleteUser)

export default router.build()
