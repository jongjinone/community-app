const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum:Number,
    image: String,
    author: {
        type: mongoose.Schema.Types.ObjectId, //mongDB간의 데이터를 연동하기 위해 Id를 집어넣어 줌. user의 object id를 저장할 예정
        ref: "user" //user모델을 참조
    },
    repleNum : {
        type: Number,
        def: 0
    }
}, {collection : "posts", timestamps: true}) //timestamps는 생성시간, 수정시간을 데이터로 저장해 줌.

const Post = mongoose.model("Post", postSchema)

module.exports = {Post}