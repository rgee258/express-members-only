const User = require('../models/user.js');
const validator = require('express-validator');

exports.membership = function(req, res, next) {

  // Redirect to root if user is not logged in or is already a member
  if (!req.user || req.user.isMember === true) {
    res.redirect('/');
  }

  res.render('membership', { title: 'Membership Access' })
};

exports.membership_submit = [
  
  // Validate form input
  validator.body('membership', 'Please enter your secret code.').isLength({ min: 1 }),

  // Sanitize form input
  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Check for validation errors
    let errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membership', { title: 'Membership Access', errors: errors.array() });
    } else {
      if (req.body.membership === process.env.MEMBERSHIP_CODE) {
        User
          .findByIdAndUpdate(req.user.id, { $set: { membership: true } })
          // Don't forget the callback here to actually execute the query
          // See: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do/41148831#41148831
          .exec(res.redirect('/'));
      }

      res.redirect('/');
    }
  }
];
