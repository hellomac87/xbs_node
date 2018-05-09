const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');

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

const index = require('./routes/index');
const admin = require('./routes/admin');
const regist = require('./routes/regist');

// 미들웨어 세팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use('/uploads', express.static('uploads'));

app.use('/', index);
app.use('/xbs_admin', admin);
app.use('/regist', regist);


app.get('/recruit', (req, res) => {
   res.render('recruit');
});

app.listen(3000, () => {
    console.log('express 3000 port on!');
});