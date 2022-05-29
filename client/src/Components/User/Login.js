import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from '../../firebase'
import '../../Style/Form.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const Sign = async (e) => {
        e.preventDefault()
        if (!(email && password)) {
            return alert("모든 값을 입력해주세요.")
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            alert("로그인에 성공하였습니다.")
            navigate('/main')
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                alert("존재하지 않는 정보입니다.")
            } else if (err.code === "auth/wrong-password") {
                alert("잘못된 입력입니다.")
            } else if (err.code === "auth/invalid-email") {
               alert("이메일 형식이 올바르지 않습니다.")
            }
            else {
                alert(err)
            }
        }
    }

    return (
        <div className='FormContain'>
        
            <form>
                <label>이메일</label><br />
                <input type="email" value={email} required onChange={(e) => { setEmail(e.target.value) }} /><br /><br />

                <label>비밀번호</label><br />
                <input type="password" value={password} required onChange={(e) => { setPassword(e.target.value) }} /><br /><br />
                <button onClick={(e) => Sign(e)}>로그인</button><br /><br />
                <button onClick={(e) => { e.preventDefault(); navigate('/register') }}>회원가입</button><br />
                
           </form>
           </div>


    )
}

export default Login