import { RouterBuilder } from 'next-api-handler';
import { getUser, putUser, deleteUser } from '@/database/controller';

const router = new RouterBuilder();

router.get(getUser);
router.put(putUser);
router.delete(deleteUser);

export default router.build();
