const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const mongoose = require('mongoose')
const config = require("./config/key")

app.use(express.static(path.join(__dirname, "../client/build"))) //정적인 파일을 로드해줌. __dirname은 현재 경로
app.use(express.json()) //json형식의 데이터를 정상적으로 읽어옴.
app.use(express.urlencoded({ extended: true })) //추가로 필요한 모듈을 설치하여 사용함.
app.use('/api/post', require('./Router/post.js'))
app.use("/image", express.static("./image"))
app.use('/api/user', require('./Router/user.js'))
app.use('/api/reple', require('./Router/reple.js'))

app.listen(port, () => {
    mongoose.connect(config.mongoURI)  //mongoose를 이용하여 DB에 데이터를 연결
        .then(() => {
            console.log("DB 연결완료!")
        })
        .catch((err) => {
            console.log("DB 연결실패... ")
        })
    console.log("서버가 운영중입니다.")
})

app.get('*', (req, res) => { //모든 경로에 대해 정적인 파일을 제공
    res.sendFile(path.join(__dirname, "../client/build/index.html")) //--dirname은 현재경로를 나타냄 
})



