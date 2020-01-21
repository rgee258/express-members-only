const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 1 },
    timestamp: { type: Date, required: true },
    body: { type: String, required: true, minlength: 1 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }
);

MessageSchema
.virtual('formattedDate')
.get(function() {
  return this.timestamp.toLocaleString();
});

module.exports = mongoose.model('Message', MessageSchema);