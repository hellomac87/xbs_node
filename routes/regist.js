const express = require('express');
const router = express.Router();
const NewsModel = require('../models/NewsModel');

// 이미지 저장 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');
const fs = require('fs');

// multer 세팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, callback){ //이미지가 저장되는 도착지 지정
        callback(null, uploadDir);
    },
    filename : function(req, file, callback){ // news-날짜.jpg(png) 형식으로 저장
        callback(null, 'news-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage : storage });

router.get('/', (req, res) => {
    res.redirect('/regist/view');
});
router.get('/view', (req, res) => {
    NewsModel.find(function(err, results){
        res.render('regist', {results : results});
    });

});
router.get('/form', (req, res) => {
    res.render('form',{result:""});
});

// Create
router.post('/form', upload.single('thumbnail'), (req, res) => {
    let News = new NewsModel({
        title : req.body.title,
        thumbnail : (req.file) ? req.file.filename : "",
        a_link : req.body.a_link,
        description : req.body.description
    });
    News.save(function(err){
        res.redirect('/regist/view');
    });

});

// Read
router.get('/view/:id',(req, res) =>{
    NewsModel.findOne({ id : req.params.id },function(err, result){
        res.render('detail',{result:result});
    });
});

// Update
router.get('/update/:id', (req, res) => {
    NewsModel.findOne({ id : req.params.id}, function(err, result){
        res.render('form',{result:result});
    });
});

router.post('/update/:id', upload.single('thumbnail'),(req, res) => {
    NewsModel.findOne({ id : req.params.id}, function(err, result){
        if(req.file){ // 요청중에 파일이 존재할 시 이전 이미지를 지운다
            fs.unlinkSync(uploadDir + '/' + result.thumbnail);
        }

        let query = {
            title : req.body.title,
            thumbnail : (req.file) ? req.file.filename : result.thumbnail,
            a_link : req.body.a_link,
            description : req.body.description
        };

        NewsModel.update({ id : req.params.id }, { $set : query }, function(err){
            res.redirect('/regist/view/' + req.params.id );
        });
    });
});

// Delete
router.get('/delete/:id',(req, res) =>{
    NewsModel.remove({ id : req.params.id },function(err){
        res.redirect('/regist/view');
    });
});
module.exports = router;