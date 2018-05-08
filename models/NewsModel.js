const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

let NewsSchema = new Schema({
    title : String,
    thumbnail : String, //이미지 파일명
    link : String,
    description : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    news_id : Number
});

NewsSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth() + 1, //getMonth()는 0부터 출력되어서 +1해줘야 잘나옴
        day : date.getDate()
    }
});

NewsSchema.plugin(autoIncrement.plugin,
    { model : 'news', field : 'id', startAt : 1 });

module.exports = mongoose.model('news', NewsSchema);
