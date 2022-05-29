const express = require('express')
const router = express.Router()
const { Post } = require('../models/post')
const { Reple } = require('../models/reple')
const { User } = require('../models/user')

router.post('/submit', (req, res) => {
    let temp = {
        reple: req.body.reple,
        postId: req.body.postId
    }

    User.findOne({ uid: req.body.uid }).exec() //요청된 uid와 같은 유저를 찾음
        .then((userInfo) => {
            temp.author = userInfo._id //권한으로 해당 유저의 id를 줌
            const NewReple = new Reple(temp) //만들어진 정보를 통해 댓글 모델을 생성
            NewReple.save(() => {
                Post.findOneAndUpdate({ _id: req.body.postId }, { $inc: { repleNum: 1 } }).exec() //게시물id를 찾아서 댓글개수를 1 증가
                    .then(() => {
                        return res.status(200).json({ success: true })
                    })
            })
        }).catch(err => {
            return res.status(400).json({ success: false })
        })
})

router.post('/getReple', (req, res) => {
    Reple.find({ postId: req.body.postId }).populate("author").exec() //요청된 게시물id가 같은 댓글을 찾음. user와 함께 참조함
        .then((repleInfo) => { 
            console.log(repleInfo)
            return res.status(200).json({ success: true, repleList: repleInfo, })
        }).catch(err => {
            res.status(400).json({ success: false })
        })
})

router.post('/edit', (req, res) => {
    let temp = {
        reple: req.body.reple,
        postId: req.body.postId,
        uid: req.body.uid
    }
    Reple.findOneAndUpdate({ _id: req.body.repleId }, { $set: temp }).exec()
        .then(() => {
            return res.status(200).json({ success: true })
        })
        .catch(err => {
            return res.status(400).json({ success: false })
        })
})

router.post('/delete', (req, res) => {
    Reple.deleteOne({ _id: req.body.repleId }).exec()
        .then(() => {
            Post.findOneAndUpdate({_id : req.body.postId}, {$inc: {repleNum: -1}}).exec().then(()=>{
                return res.status(200).json({ success: true })
            })
        })
        .catch(err => {
            return res.status(400).json({ success: false })
        })
})

module.exports = router
