import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function RepleUpload(props) { //props는 게시물의 id
    const [reple, setReple] = useState("")
    const user = useSelector(state=>state.user)  //user store에 접근

    const RepleUp = (e)=> {
        e.preventDefault()
        if(!reple){
            return alert("댓글을 작성해주세요.")
        }
        let body = {
            reple : reple,
            uid: user.uid,
            postId: props.postId
        }

        axios.post('/api/reple/submit', body).then((res)=>{ //서버에 전송하면 서버에서 댓글모델이 만들어지고, 댓글 개수를 1개 올려줌
            alert("댓글을 작성하였습니다.")
            window.location.reload()
        }).catch(err=>{
            alert("댓글 작성에 실패했습니다.")
        })
    }

  return (
    <div style={{width:"100%"}}>
        <form style={{marginTop:"50px", marginBottom:"20px", width:"100%"}}>
            <label style={{marginRight: "10px", marginBottom:"5px"}}><h4><b>댓글</b></h4></label>
        <textarea style={{marginRight:"20px", width: "100%", height: "100px", padding:"10px"}} value = {reple} onChange={(e)=>setReple(e.target.value)}/>
        <button onClick={(e)=>{RepleUp(e)}}>등록</button>
        </form>
    </div>
  )
}

export default RepleUpload