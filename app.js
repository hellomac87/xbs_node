const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// flash message
const flash = require('connect-flash');

// passport login
const passport = require('passport');
const session = require('express-session');

//mongodb connect
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;  //mongoose promise error 처리
const autoIncrement = require('mongoose-auto-increment');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connected');
});
const connect = mongoose.connect('mongodb://127.0.0.1:27017/newsTest',{useMongoClient : true});
autoIncrement.initialize(connect);

// 미들웨어 세팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use('/uploads', express.static('uploads'));

// session setting (passport?)
app.use(session({
        secret: 'fastcampus',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 2000 * 60 * 60 //지속시간 2시간
        }
    })
);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());




const index = require('./routes/index');
const admin = require('./routes/admin');
const regist = require('./routes/regist');

app.use('/', index);
app.use('/xbs_admin', admin);
app.use('/regist', regist);


app.get('/recruit', (req, res) => {
   res.render('recruit');
});

app.listen(3000, () => {
    console.log('express 3000 port on!');
});