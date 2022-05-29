const express = require('express')
const router = express.Router()
const multer = require('multer')

const { Post } = require('../models/post.js')
const { Counter } = require('../models/counter.js')
const { User } = require("../models/user")
const { Router } = require('express')

router.post('/submit', (req, res) => {       //게시글 작성 기능
    let temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    }
    Counter.findOne({ name: 'counter' }).exec().then(counter => {
        temp.postNum = counter.postNum //counter의 게시물 번호를 지정해 줌.
        User.findOne({ uid: req.body.uid }).exec().then(userInfo => {  //요청된 uid와 일치하는 user를 찾아서
            temp.author = userInfo._id    // 해당 user의 Id번호를 권한번호로 지정한 뒤
            const CommunityPost = new Post(temp) //새로운 포스트모델을 생성하여 요청된 정보와 함께 넘겨줌.
            CommunityPost.save().then(() => {
                Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }) //counter의 게시물 번호를 1증가
                    .then(() => {
                        res.status(200).json({ success: true })
                    })
            })
        })
    }).catch(err => {
        err.status(400).json({ success: false })
    })
})

router.post('/list', (req, res) => {
    let sort = {}
    if(req.body.sort ==="최신순"){     //요청된 sort의 방법에 따라 정렬방법을 추가함
        sort.createdAt = -1 //-1은 내림차순
    }else{
        sort.repleNum = -1
    }
                                    //제목이나 내용에 검색어를 포함하고 있는지 찾아서 확인
    Post.find({$or : [{title: {$regex: req.body.searchTerm}}, {content: {$regex: req.body.searchTerm}}]})
    .populate("author") //author를 통해 user도 함께 참조
    .sort(sort) //sort(doc)는 doc안에 {key : value}형태를 읽고 이에 따라 정렬하는 기능.
    .skip(req.body.skip) // 요청된 개수만큼 skip함.
    .limit(3) // 출력할 개수를 제한하는 기능
    .exec()
    .then(doc => {  
        res.status(200).json({ success: true, postList: doc })
    }).catch(err => {
        res.status(400).json({ success: false })
    })
})

router.post('/detail', (req, res) => {
    Post.findOne({ postNum: Number(req.body.postNum) }).populate("author").exec() //요청된 게시물 번호가 일치하는 post를 찾음
        .then(doc => {
            res.status(200).json({ success: true, post: doc }) //post라는 이름으로 해당 post 정보를 전송함.
        }).catch(err => {
            res.status(400).json({ success: false })
        })
})

router.post('/edit', (req, res) => {
    console.log(req.body)
    let temp = {
        title: req.body.title,
        content: req.body.content,
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp }).exec()  //게시물번호를 넘겨받아 해당 게시물을 temp로 업데이트
        .then(() => {
            console.log("수정성공")
            res.status(200).json({ success: true })
        }).catch(err => {
            console.log("수정실패")
            err.status(400).json({ success: false })
        })
})

router.post('/delete', (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) }).exec() //전달받은 게시물 번호를 찾아서 삭제해 줌.
        .then(doc => {
            res.status(200).json({ success: true })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

const storage = multer.diskStorage({ //multer를 통해 전달받은 데이터를 파일 디스크에 저장
    destination: (req, file, cb) => {  //저장할 경로를 지정
        cb(null, 'image')
    },
    filename: (req, file, cb) => { //저장할 파일의 이름 지정
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('image')

router.post('/image/upload', (req, res) => {
    upload(req, res, (err) => {

        if (err) {
            res.status(400).json({ success: false })
        }
        else {
            res.status(200).json({ success: true, filepath: req.file.path })
        }
    })
})

module.exports = router