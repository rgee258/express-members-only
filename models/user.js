const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

let UserSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    userName: { type: String, required: true, minlength: 1, match: emailRegex },
    password: { type: String, required: true, minlength: 1 },
    membership: { type: Boolean },
    admin: { type: Boolean }
  }
);

UserSchema
.virtual('fullName')
.get(function() {
  return this.firstName + ' ' + this.lastName;
});

UserSchema
.virtual('isAdmin')
.get(function() {
  if (this.admin === true) { return true; }
  return false;
})

UserSchema
.virtual('isMember')
.get(function() {
  if (this.membership === true) { return true; }
  return false;
})

module.exports = mongoose.model('User', UserSchema);