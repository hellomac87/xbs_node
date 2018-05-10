const express = require('express');
const router = express.Router();
const passwordHash = require('../libs/passwordHash');
const UserModel = require('../models/UserModel');

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//passport serializeUser, deserializeUser
passport.serializeUser(function(user, done){
    console.log('serializeUser');
    done(null, user);
});
passport.deserializeUser(function(user, done){
    console.log('deserializeUser');
    done(null, user);
});

// passport 정책 작성
passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        session:true, // 세션 저장 여부
        passReqToCallback:true
    },
    (req, username, password, done) => {
        UserModel.findOne({
            username:req.body.username,
            password:passwordHash(req.body.password)
        },(err,user) => {
           if(err){ console.log(err) }
           if(!user){
               return done(null, false, {message:'아이디 또는 비밀번호 오류'});
           }else{
               return done(null, user);
           }
        });
    }
));

// sign in router
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', passport.authenticate('local',{
        failureRedirect:'/xbs_admin', //실패시 리다이렉트
        failureFlash:true //실패시 플래시 메세지
    }),
    (req, res) => {
        res.send(req.user);
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