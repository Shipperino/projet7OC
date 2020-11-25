const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/login2', auth, userCtrl.login2);



module.exports = router;


// A travailler :
//  Acces phpmyadmin 
//  connection database et verification des routes/controllers

//  VueJs PROPS 
//  Lien frontedn /backEnd AXIOS