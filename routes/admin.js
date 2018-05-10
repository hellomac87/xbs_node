const express = require('express');
const router = express.Router();
const passwordHash = require('../libs/passwordHash');
const UserModel = require('../models/UserModel');

// sign in router

router.get('/', (req, res) => {
    res.render('login');
});
router.post('/', (req, res) => {
    res.render('login');
});

// sign up router
router.get('/signup', (req, res) => {
   res.render('signup');
});

router.post('/signup', (req, res) =>{

    let User = new UserModel({
        username : req.body.username,
        password : passwordHash(req.body.password),
        displayName: req.body.displayName
    });
    User.save(function(err){
        res.redirect('/xbs_admin');
    });
});

module.exports = router;