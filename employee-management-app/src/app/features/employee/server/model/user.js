import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  salary: Number,
  status: String,
  birthday: String,
})

const Users = models.user || model('user', userSchema)
export default Users
