const Message = require('../models/message.js');
const validator = require('express-validator');

exports.message = function(req, res, next) {

  // Redirect to root if user is not logged in
  if (!req.user) {
    res.redirect('/');
  }

  res.render('message', { title: 'New Message' })
};

exports.message_submit = [
  
  // Validate form input
  validator.body('title', 'Message must contain a title and be alphanumeric.').isLength({ min: 1 }),
  validator.body('body', 'Message must contain a body and be alphanumeric.').isLength({ min: 1 }),

  (req, res, next) => {

    // Check for validation errors
    let errors = validator.validationResult(req);

    let message = new Message(
      {
        title: req.body.title,
        timestamp: new Date(),
        body: req.body.body,
        author: req.user.id
      }
    );

    if (!errors.isEmpty()) {
      res.render('message', { title: 'New Message', previous: message, errors: errors.array() });
    } else {
      message.save(function(err) {
        if (err) { return next(err); }
        // Redirect to root on success
        res.redirect('/');
      });
    }

  }

];

exports.message_delete = function(req, res, next) {
  Message.findByIdAndRemove(req.body.message_id, function(err) {
    if (err) { return next(err); }
    // Redirect to root on success
    res.redirect('/');
  });
}
