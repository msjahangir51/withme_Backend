const { default: mongoose } = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const MessageModel = mongoose.model("messages",MessageSchema)

  module.exports ={MessageModel}