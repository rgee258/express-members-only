const validator = require('express-validator');

exports.message = function(req, res, next) {
  res.render('message', { title: 'New Message' })
};

exports.message_submit = [
  
  // TODO form validation

  //(req, res, next) => {

  //};

];

exports.message_delete = function(req, res, next) {
  
}