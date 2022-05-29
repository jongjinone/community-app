import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";
import ImageUpload from "./ImageUpload";

const Upload = (props) => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const user = useSelector(state => state.user)       //store의 user에 접근
    useEffect(() => {
        if (!user.accessToken) {         //user의 토큰이 없는 경우
            alert("로그인된 회원만 글을 작성할 수 있습니다.")
            navigate('/login')
        }
    }, [])

    const Submit = (e) => {
        e.preventDefault()  //새로고침 방지
        if (content === "") {       //내용이 입력되지 않은 경우
            return alert("내용을 입력해주세요.")
        }

        let body = {
            title: title,
            content: content,
            image: image,
            uid: user.uid
        }

        if (title === "") {           //제목이 없는 경우
            body.title = "제목 없음"
        }

        axios.post('api/post/submit', body)           //입력된 body를 서버에 전송
            .then(res => {
                alert("글 작성이 완료되었습니다.")
                setTitle("")
                setContent("")
                navigate('/main')
            })
            .catch(err => {
                alert("글 작성에 실패하였습니다.")
                console.log(err)
            })
    }

    return (
        <UploadDiv>
            <UploadForm onSubmit={(e) => { Submit(e) }}>
                <label htmlFor="title"><h2>제목</h2></label>
                <input id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <br />
                <ImageUpload setImage={setImage} />
                <br />
                <label htmlFor="content"><h3>내용</h3></label>
                <textarea style={{ padding: "15px" }} value={content} onChange={(e) => { setContent(e.target.value) }} />
                <UploadButtonDiv>
                    <button className='cancel' onClick={e => { e.preventDefault(); navigate(-1) }} type="submit">취소하기</button>
                    <button type="submit">작성하기</button></UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload