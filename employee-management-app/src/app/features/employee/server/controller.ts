import { NextApiRequest, NextApiResponse } from 'next'

import Users from '@/common/server/services/user'

// GET: http://localhost:3000/api/users
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await Users.find({})
  if (!users) {
    throw new Error('Error while fetching data!')
  }
  res.status(200).json(users)
}

// GET: http://localhost:3000/api/user/1
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query

  if (!userId) {
    throw new Error('User not found!')
  }

  const user = await Users.findById(userId)
  res.status(200).json(user)
}

// POST: http://localhost:3000/api/users
export const postUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = req.body
  if (!formData) {
    throw new Error('Form Data not provided')
  }
  const user = await Users.create(formData)
  res.status(200).json(user)
}

// PUT: http://localhost:3000/api/users
export const putUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query
  const formData = req.body

  if (userId && formData) {
    const user = await Users.findByIdAndUpdate(userId, formData)
    res.status(200).json(user)
    return
  }

  throw new Error('User not selected')
}

// DELETE: http://localhost:3000/api/users
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query

  if (userId) {
    await Users.findByIdAndDelete(userId)
    res.status(200).json({ deleted: userId })
    return
  }

  throw new Error('User not selected')
}
