import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export function getConnectionString() {
  return process.env.DB_URL;
}

export function startDataBase() {
  mongoose.connect(getConnectionString(), (err, db) => {
    if(err) {
      console.error(err);
      throw err;
    }
  });
}

export async function comparePassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {
    console.log(e);

    return false;
  }
}

export async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 14);
  } catch (e) {
    console.log(e);

    return false;
  }
}

export default db;
