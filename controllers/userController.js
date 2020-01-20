const User = require('../models/user.js');
const validator = require('express-validator');
const bcrypt = require('bcryptjs');

// User GET sign up form
exports.sign_up = function(req, res, next) {
  res.render('signup', { title: 'Sign Up'});
};

// User POST sign up form
exports.sign_up_submit = [

  // Validate form input
  // Use .bail to prevent double error messages appearing when fields are empty
  // As seen here: https://stackoverflow.com/questions/58069250/express-validator-returns-validation-errors-twice
  validator.body('firstName', 'First name is required and must be alphanumeric.').isLength({ min: 1 }).bail().trim().isAlphanumeric(),
  validator.body('lastName', 'Last name is required and must be alphanumeric.').isLength({ min: 1 }).bail().trim().isAlphanumeric(),
  validator.body('userName', 'Email is required.').isLength({ min: 1 }).bail().trim().isEmail(),
  validator.body('password', 'Password is required.').isLength({ min: 1 }),
  validator.body('passwordConfirmation', 'Password confirmation must be the same as password input.').custom((confirm, { req }) => confirm === req.body.password),

  // Sanitize form input
  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Check for validation errors
    let errors = validator.validationResult(req);

    // Create a new User with provided inputs
    let user = new User(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
        membership: false,
        admin: false
      }
    );

    // Rerender form if errors
    if (!errors.isEmpty()) {
      res.render('signup', { title: 'Sign Up', previous: user, errors: errors.array() });
    } else {
      // Set admin credentials
      if (req.body.admin == process.env.ADMIN_CODE) {
        user.admin = true;
        user.membership = true;
      }
      // Generate salt for hashing
      bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err) };
        // Hash password
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) { return next(err) };
          // Assign the hashed password to our new User
          user.password = hash;
          // Save as usual and redirect
          user.save(function(err) {
            if (err) { return next(err); }
            // Log in using passport and redirect
            req.login(user, function(err) {
              if (err) { return next(err); }
              return res.redirect('/');
            });
          });
        });
      });
    };
  }
];