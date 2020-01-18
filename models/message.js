const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 1 },
    timestamp: { type: Date, required: true },
    body: { type: String, required: true, minlength: 1 },
    author: { type: Schema.Types.ObjectId }
  }
);

module.exports = mongoose.model('Message', MessageSchema);