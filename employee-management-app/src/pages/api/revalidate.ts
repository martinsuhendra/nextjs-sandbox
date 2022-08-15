import { NextApiRequest, NextApiResponse } from 'next'
import { BadRequestException, RouterBuilder } from 'next-api-handler'

const router = new RouterBuilder()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.userId) {
    throw new BadRequestException('Id is not provided')
  }

  await res.revalidate(`/employee/${req.query.userId}`)
  return res.json({ revalidated: true })
})

export default router.build()
