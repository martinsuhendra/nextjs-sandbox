import Users from '../model/user';

// GET: http://localhost:3000/api/users
export async function getUsers(req: any, res: any) {
  try {
    const users = await Users.find({});

    if (!users) {
      res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching data' });
  }
}

// GET: http://localhost:3000/api/user/1
export async function getUser(req: any, res: any) {
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
export async function postUser(req: any, res: any) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form Data not provided' });
    Users.create(formData, function (err: any, data: any) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// PUT: http://localhost:3000/api/users
export async function putUser(req: any, res: any) {
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
export async function deleteUser(req: any, res: any) {
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
