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
    filename : function(req, file, callback){ // product-날짜.jpg(png) 형식으로 저장
        callback(null, 'news-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage : storage });


router.get('/view', (req, res) => {
    NewsModel.find(function(err, results){
        res.render('regist', {results : results});
    });

});
router.get('/form', (req, res) => {
    res.render('form');
});
router.post('/form', upload.single('thumbnail'), (req, res) => {
    let News = new NewsModel({
        title : req.body.title,
        thumbnail : (req.file) ? req.file.filename : "",
        link : req.body.link,
        description : req.body.description
    });
    News.save(function(err){
        res.send(News);
    });

});
module.exports = router;