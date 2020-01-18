const validator = require('express-validator');

exports.membership = function(req, res, next) {
  res.render('membership', { title: 'Membership Access' })
};

exports.membership_submit = [
  
  // TODO form validation

  //(req, res, next) => {

  //};

];