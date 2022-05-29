const mongoose = require('mongoose')

const repleSchema = new mongoose.Schema(
    {
        reple: String,
        author: {
            type: mongoose.Schema.Types.ObjectId, //mongDB간의 데이터를 연동하기 위해 Id를 집어넣어 줌. user의 object id를 저장할 예정
            ref: "user" //ref가 있으면 user모델의 다른 정보도 참조 가능 참조
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
        }
    },
    { collection: "reples", timestamps: true }
)

const Reple = mongoose.model("reple", repleSchema)

module.exports = { Reple }