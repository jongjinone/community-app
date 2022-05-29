const express = require('express')
const router = express.Router()
const { User } = require('../models/user.js')

const { Counter } = require('../models/counter.js')

router.post('/register', (req, res) => { //회원가입 기능
    let temp = req.body
    Counter.findOne({ name: "counter" }).then(doc => { 
        temp.userNum = doc.userNum               //counter의 번호를 유저번호로 입력해준다.
        const userData = new User(req.body)        //새로운 유저 모델을 생성하여 전송된 정보를 저장
        userData.save()
        .then(() => {
            Counter.updateOne({name: "counter", $inc : {userNum : 1}}).then( ()=>{ //counter는 1증가
                res.status(200).json({ success: true })
            })
        })
        .catch((err) => {
                console.log(err)
                res.status(400).json({ success: false })
        })
    })
})

router.post('/namecheck', (req,res)=>{ //중복확인 기능
    User.findOne({displayName : req.body.displayName}).exec() //이름이 겹치는 데이터를 확인
    .then(doc=>{ 
        let check = true // 일단 check는 true
        if(doc){
            check = false //중복되는 이름이 있는 경우 check는 false
        }
        res.status(200).json({success : true, check}) //정해진 check를 다시 전송
    }).catch(err=>{
        res.status(400).json({success : false})
    })
})

router.post('/emailcheck', (req,res)=>{ //중복확인 기능
    console.log(req.body)
    User.findOne({email : req.body.email}).exec() //이메일이 겹치는 데이터를 확인
    .then(doc=>{ 
        let check = true // 일단 check는 true
        if(doc){
            check = false //중복되는 이메일이 있는 경우 check는 false
        }
        res.status(200).json({success : true, check}) //정해진 check를 다시 전송
    }).catch(err=>{
        res.status(400).json({success : false})
    })
})

module.exports = router;