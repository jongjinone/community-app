import React, { useEffect, useState } from 'react'
import Detail from './Detail'
import { Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RepleArea from '../Reple/RepleArea'
import '../../Style/PostArea.css'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

function PostArea() {
    const [postInfo, setPostInfo] = useState({})
    const [state, setState] = useState(false)
    let { postNum } = useParams() //경로의 idx를 사용하기 위해 useParams 설정

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
            postNum: postNum
        }
        axios.post("/api/post/detail", body) //서버에 게시물 번호를 전송
            .then(res => {
                setPostInfo(res.data.post) //post에 대한 정보를 받아온다.
                setState(true) //정보를 받아오는 데 성공하면 state를 true로 지정.
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='ContainBox'>
            {state  //state에 따라 게시물을 보여주거나 로딩 중을 보여줌.
                ? <>
                    <Detail postInfo={postInfo} /> {/* 게시물의 정보를 넘겨줌 */}
                    <RepleArea postId={postInfo._id}/> {/*게시물의 id를 넘겨줌*/}
                </>
                : <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>}
        </div>
    )
}

export default PostArea