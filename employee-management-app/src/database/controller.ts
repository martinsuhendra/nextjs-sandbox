import Users from '@/app/features/employee/server/model/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { EmployeeInput } from '@/app/features/employee/EmployeeForm';
import Error from 'next/error';

// GET: http://localhost:3000/api/users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find({});

    if (!users) {
      return res.status(404).json('Error while fetching data!');
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// GET: http://localhost:3000/api/user/1
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: 'Data not found' });
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the user' });
  }
}

// POST: http://localhost:3000/api/users
export async function postUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form Data not provided' });
    Users.create(formData, function (err: Error, data: EmployeeInput) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// PUT: http://localhost:3000/api/users
export async function putUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    return res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    return res.status(404).json({ error: 'Error while updating user' });
  }
}

// DELETE: http://localhost:3000/api/users
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    }
    return res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    return res.status(404).json({ error: 'Error while deleting user' });
  }
}
