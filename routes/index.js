const express = require('express');
const router = express.Router();
const NewsModel = require('../models/NewsModel');

router.get('/', (req, res) => {
    NewsModel.find(function(err, results){
        res.render('index', {results:results});
    }).sort("-id");
});

module.exports = router;