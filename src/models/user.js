import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  telegramHandle: String,
  telegramChatId: String,
  enabled: Boolean
});

const model = mongoose.model('user', schema);

export default model;
