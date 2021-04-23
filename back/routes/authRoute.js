'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/login', authController.login);

router.post('/register',
    body('username').blacklist(';'),
    body('first_name').blacklist(';'),
    body('last_name').blacklist(';'),
    body('role').isLength({max: 1}).blacklist(';'),
    body('class').isLength({max: 3}).blacklist(';'),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create
//    authController.login
);

router.get('/logout', authController.logout);

module.exports = router;