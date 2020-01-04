import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  message: String,
});

const model = mongoose.model('compliment', schema);

export default model;
