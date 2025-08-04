const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// ✅ Correct export with a valid model name
module.exports = mongoose.model('User', userSchema);
