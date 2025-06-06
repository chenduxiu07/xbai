const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userMessage: String,
  aiResponse: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);