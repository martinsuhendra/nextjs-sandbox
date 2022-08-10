import { NextApiRequest, NextApiResponse } from 'next'

import Users from '@/app/features/employee/server/services/user'

// GET: http://localhost:3000/api/users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find({})

    if (!users) {
      res.status(404).json({ error: 'Error while fetching data!' })
      return
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error })
  }
}

// GET: http://localhost:3000/api/user/1
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query

    if (!userId) {
      res.status(404).json({ error: 'User not found!' })
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
      res.status(404).json({ error: 'Form Data not provided' })
      return
    }
    const user = await Users.create(formData)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error })
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
      return
    }
    res.status(404).json({ error: 'User not selected' })
  } catch (error) {
    res.status(404).json({ error })
  }
}

// DELETE: http://localhost:3000/api/users
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query

    if (userId) {
      await Users.findByIdAndDelete(userId)
      res.status(200).json({ deleted: userId })
      return
    }
    res.status(404).json({ error: 'User not selected' })
  } catch {
    res.status(404).json({ error: 'Error while deleting user' })
  }
}
