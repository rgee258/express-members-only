var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const membershipController = require('../controllers/membershipController.js');
const loginController = require('../controllers/loginController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users sign up form */
router.get('/signup', userController.sign_up);

/* POST users sign up form */
router.post('/signup', userController.sign_up_submit);

/* GET login form */
router.get('/login', loginController.login);

/* POST login form */
router.post('/login', loginController.login_submit);

/* GET membership form */
router.get('/membership', membershipController.membership);

/* POST membership form */
router.post('/membership', membershipController.membership_submit);

module.exports = router;
