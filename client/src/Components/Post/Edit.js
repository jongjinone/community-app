import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";
import '../../Style/Edit.css'
import { useSelector } from 'react-redux';

const Edit = () => {
    let { postNum } = useParams()
    const [postInfo, setPostInfo] = useState({})
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)
    
    useEffect(()=>{
        if(!user.accessToken){
            alert("로그인된 회원만 이용할 수 있습니다.")
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        let body = {
            postNum: postNum //게시물번호를 넘겨줌.
        }
        axios.post("/api/post/detail", body).then((res) => {  //서버로부터 post정보를 받음
            setPostInfo({
                title: res.data.post.title,
                content: res.data.post.content,
                postNum: res.data.post.postNum,
                image: res.data.post.image
            })
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        setTitle(postInfo.title)         //postinfo가 변할 때마다  새롭게 제목과 내용, 이미지를 업데이트 
        setContent(postInfo.content)
        setImage(postInfo.image)
    }, [postInfo])


    const Submit = (e) => {
        e.preventDefault() //새로고침 방지
        if (content === "") {
            return alert("내용을 입력해주세요.")
        }

        let body = {
            title: title,
            content: content,
            postNum: postNum,
            image: image
        }
        if (title === "") {     //제목이 없는 경우
            body.title = "제목 없음"
        }

        axios.post('/api/post/edit', body)
            .then(res => {
                alert("글 수정이 완료되었습니다.")
                navigate(-1)
            })
            .catch(err => {
                alert("글 수정에 실패하였습니다.")
                console.log(err)
            })
    }

    return (
        <UploadDiv>
            <UploadForm >
                <label htmlFor="title"><h2>제목</h2></label>
                <input id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <br />
                <div className='image'>
                    {postInfo.image ? <><img alt="" src={`http://localhost:5000/${postInfo.image}`}
                        style={{ width: "30%", height: "auto" }}/><div> [현재 이미지]</div><br /></> : null}
                </div>
                
                <label htmlFor="content"><h3>내용</h3></label>
                <textarea style={{padding:"15px"}} value={content} onChange={(e) => { setContent(e.target.value) }} />
                <UploadButtonDiv>
                    <button className='cancel' onClick={e => { e.preventDefault(); navigate(-1) }} type="submit">취소하기</button>
                    <button type="submit" onClick={(e) => { Submit(e) }}>수정하기</button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}



export default Edit