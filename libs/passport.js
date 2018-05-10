const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/UserModel');

// LocalStrategy
passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        session:true, // 세션 저장 여부
        passReqToCallback:true
    }, (req, username, password, done) => {
        //callback 실행
    UserModel.findOne({username : username , password: passwordHash(password)},
        function(err, user){
            if (findError) return done(findError); // 서버 에러 처리
            if(!user){
                return done(null, false,{ message:'아이디 또는 비밀번호 오류 입니다'});
             }else{
                return done(null, user);
            }
        });
    })
);