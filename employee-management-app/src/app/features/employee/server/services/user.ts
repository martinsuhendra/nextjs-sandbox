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
export default models.User || model('User', userSchema)
