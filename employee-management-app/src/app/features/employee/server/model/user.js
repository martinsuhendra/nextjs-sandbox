import { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  salary: Number,
  status: String,
  birthday: String,
  avatar: String,
});

const Users = models.user || model('user', userSchema);
export default Users;
