var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const membershipController = require('../controllers/membershipController.js');
const loginController = require('../controllers/loginController.js');
const messageController = require('../controllers/messageController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only Club', user: req.user });
});

/* GET users sign up form */
router.get('/signup', userController.sign_up);

/* POST users sign up form */
router.post('/signup', userController.sign_up_submit);

/* GET login form */
router.get('/login', loginController.login);

/* POST login form */
router.post('/login', loginController.login_submit);

/* GET logout */
router.get('/logout', loginController.logout)

/* GET membership form */
router.get('/membership', membershipController.membership);

/* POST membership form */
router.post('/membership', membershipController.membership_submit);

/* GET message form */
router.get('/message', messageController.message);

/* POST message form */
router.post('/message', messageController.message_submit);

module.exports = router;
