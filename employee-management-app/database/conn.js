import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://martinsuhendra:admin123@nextjs-exercise.icqs70t.mongodb.net/?retryWrites=true&w=majority';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    if (connection.readyState == 1) {
      console.log('Database connected!!');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
