const User = require('../models/user.js');
const validator = require('express-validator');
const passport = require('passport');

exports.login = function(req, res, next) {

  // Redirect to root if user is already logged in
  if (req.user) {
    res.redirect('/');
  }

  res.render('login', { title: 'Account Login' });
};

exports.login_submit = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
  // Continue the middleware chain
  (req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
}
