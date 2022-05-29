import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import firebase from '../../firebase'
import '../../Style/Form.css'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pwconfirm, setPwconfirm] = useState("")
    const [state, setState] = useState(false)
    const navigate = useNavigate()
    const [nameCheck, setNameCheck] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)

    const [possible, setPossible] = useState(false)
    const [impossible, setImpossible] = useState(false)
    const [passedName, setPassedName] = useState("")

    const [Epossible, setEpossible] = useState(false)
    const [Eimpossible, setEimpossible] = useState(false)
    const [passedEmail, setPassedEmail] = useState("")

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.accessToken) {
            navigate("/main");           //만약에 인증된 유저라면 메인화면으로 이동
        }
    }, []);

    const NameCheck = (e) => { //중복체크 확인 함수
        e.preventDefault() //이벤트 시작 시 새로고침을 하지 않음.
        setPassedName(name)       //현재 입력되어 있는 값을 저장

        if (!name) {
            return alert("닉네임을 입력해주세요"); // name에 입력이 없는 경우
        }

        let body = {
            displayName: name       //닉네임을 body에 담는다.
        }

        axios.post('/api/user/namecheck', body).then(res => {  //body를 서버로 전송
            if (res.data.check) { //chek가 완료된 경우
                setNameCheck(true) //namechek를 true로 설정
                setPossible(true)  //닉네임 사용 가능 메세지 true
                setImpossible(false)  //닉네임 사용 불가능 false
                setTimeout(() => {
                    setPossible(false)  //3초뒤 닉네임 사용가능 메세지 사라짐
                }, 3000);
            } else {                           //check가 실패한 경우
                setNameCheck(false) //namechek를 false로 설정
                setImpossible(true) //닉네임 사용 불가능 메세지 true
                setPossible(false)  //닉네임 사용 가능 메세지 false
                setTimeout(() => {
                    setImpossible(false) //3초뒤 닉네임 사용 불가능 메세지 사라짐
                }, 3000);
            }
        }).catch(err => {
            console.log("통신에러") //서버와의 통신 실패
        })
    }

    const EmailCheck = (e) => { //중복체크 확인 함수
        e.preventDefault() //이벤트 시작 시 새로고침을 하지 않음.
        setPassedEmail(email)       //현재 입력되어 있는 값을 저장

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            setState(false)
            return alert("올바른 이메일 형식을 입력하세요")
        }

        if (!email) {
            return alert("이메일을 입력해주세요"); // name에 입력이 없는 경우
        }

        let body = {
            email: email       //닉네임을 body에 담는다.
        }

        axios.post('/api/user/emailcheck', body).then(res => {  //body를 서버로 전송
            if (res.data.check) { //chek가 완료된 경우
                setEmailCheck(true) //emailchek를 true로 설정
                setEpossible(true)  //이메일 사용 가능 메세지 true
                setEimpossible(false)  //이메일 사용 불가능 false
                setTimeout(() => {
                    setEpossible(false)  //3초뒤 닉네임 사용가능 메세지 사라짐
                }, 3000);
            } else {                           //check가 실패한 경우
                setEmailCheck(false) //emailchek를 false로 설정
                setEimpossible(true) //이메일 사용 불가능 메세지 true
                setEpossible(false)  //이메일 사용 가능 메세지 false
                setTimeout(() => {
                    setEimpossible(false) //3초뒤 닉네임 사용 불가능 메세지 사라짐
                }, 3000);
            }
        }).catch(err => {
            console.log("통신에러") //서버와의 통신 실패
        })
    }
    
    const Regi = async (e) => {
        e.preventDefault() //새로고침 방지
        setState(true)  //회원가입 버튼 비활성화를 true로 만듦. 

        if (!(name && email && password && pwconfirm)) { //입력되지 않은 항목이 있는 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert('항목을 채워주세요')
        }

        if (passedName !== name) {   //중복확인 당시 저장한 닉네임과 현재 입력된 닉네임이 다를 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert('닉네임 중복을 확인해주세요.')
        }

        if (!nameCheck) { //중복확인이 안되어 있는 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert("닉네임 중복을 확인해 주세요.")
        }

        if (passedEmail !== email) {   //중복확인 당시 저장한 닉네임과 현재 입력된 닉네임이 다를 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert('이메일 중복을 확인해주세요.')
        }

        if (!emailCheck) { //중복확인이 안되어 있는 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert("이메일 중복을 확인해 주세요.")
        }
        

        if (password !== pwconfirm) { //비밀번호와 확인이 다른 경우
            setState(false) //회원가입 버튼 비활성화를 false로 만듦.
            return alert("비밀번호가 일치하지 않습니다.")
        }

        

        let createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        //이메일과 비밀번호를 통해 파이어베이스 유저를 생성
        await createdUser.user.updateProfile({
            displayName: name,
        })
        let body = {
            email: createdUser.user.multiFactor.user.email,
            displayName: createdUser.user.multiFactor.user.displayName,  //파이어베이스로부터 각각 유저 정보를 body에 저장한다.
            uid: createdUser.user.multiFactor.user.uid,
        }
        axios.post('/api/user/register', body) //body를 서버에 전송
            .then(res => {
                alert('회원가입을 완료했습니다.')
                navigate('/main')
            })
            .catch(err => {
                console.log(err)
                return alert("회원가입이 실패하였습니다.")
            })


    }

    return (
        <div className='FormContain'>
            <form>
                <label>닉네임</label><br />
                <input type="name" value={name} onChange={(e) => { setName(e.target.value); }} /><br />
                {possible && <div style={{ color: "blue" }}>사용가능한 닉네임입니다.</div>}
                {impossible && <div style={{ color: "red" }}>이미 존재하는 닉네임입니다.</div>}
                <button style={{ marginTop: "10px" }} onClick={(e) => { NameCheck(e); }}>닉네임 중복 확인</button><br /><br />
                <label>이메일</label><br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                {Epossible && <div style={{ color: "blue" }}>사용가능한 이메일입니다.</div>}
                {Eimpossible && <div style={{ color: "red" }}>이미 존재하는 이메일입니다.</div>}
                <button style={{ marginTop: "10px" }} onClick={(e) => { EmailCheck(e); }}>이메일 중복 확인</button><br /><br />
                <label>비밀번호</label><br />
                <input type="password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <label>비밀번호 확인</label><br />
                <input type="password" value={pwconfirm} minLength={8} onChange={(e) => setPwconfirm(e.target.value)} /><br /><br />
                <button disabled={state} onClick={(e) => { Regi(e) }}>회원가입</button>
            </form>
        </div>
    )
}

export default Register