import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const withError = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      let message = ''
      if (typeof error === 'string') {
        message = error.toUpperCase()
      } else if (error instanceof Error) {
        message = error.message
      }
      res.status(404).json({ error: message })
    }
  }
}

export default withError
