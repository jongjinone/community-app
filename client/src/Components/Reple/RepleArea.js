import React from 'react'
import RepleUpload from './RepleUpload'
import RepleList from './RepleList'
import { useSelector } from 'react-redux'

function RepleArea(props) { //props로 게시물의 id를 받아옴
    const user = useSelector(state=>state.user) //store에 접근
  return (
    <div style={{width: "60%", marginBottom:"100px"}}>
        <RepleUpload postId = {props.postId}/> {/*댓글 업로드창을 보여줌. */}
        <RepleList postId= {props.postId}/> {/*댓글 목록들을 보여줌*/}
    </div>
  )
}

export default RepleArea