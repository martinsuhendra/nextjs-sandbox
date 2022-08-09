import { NextApiRequest, NextApiResponse } from 'next'

import Users from '@/app/features/employee/server/model/user'

// GET: http://localhost:3000/api/users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find({})

    if (!users) {
      throw new Error('Error while fetching data!')
    }
    return res.status(200).json(users)
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// GET: http://localhost:3000/api/user/1
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query

    if (!userId) {
      throw new Error('User not found!')
    }
    const user = await Users.findById(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error })
  }
}

// POST: http://localhost:3000/api/users
export async function postUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' })
    }
    const user = await Users.create(formData)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// PUT: http://localhost:3000/api/users
export async function putUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query
    const formData = req.body

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData)
      res.status(200).json(user)
    }
    throw new Error('user not selected')
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// DELETE: http://localhost:3000/api/users
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query

    if (userId) {
      await Users.findByIdAndDelete(userId)
      res.status(200).json({ deleted: userId })
    }
    throw new Error('User not selected')
  } catch {
    return res.status(404).json({ error: 'Error while deleting user' })
  }
}
