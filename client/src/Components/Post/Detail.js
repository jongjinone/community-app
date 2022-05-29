import axios from 'axios'
import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../../Style/Detail.css"

function Detail(props) {  //PostArea로부터 props를 넘겨받음. props.postinfo에는 게시물 정보와 관련유저 정보가 있음.
  const navigate = useNavigate()

  const user = useSelector(state => state.user)

  const { postNum } = useParams() //게시물 번호를 위해 사용

  const Delete = () => {
    if (!(window.confirm("삭제하시겠습니까?"))) {
      return
    } else {
      let body = {
        postNum: postNum          // 게시물 번호를 전송
      }
      axios.post("/api/post/delete", body)
        .then(res => {
          alert("게시글이 삭제되었습니다.")
          navigate(-1)

        }).catch(err => {
          alert("게시글을 삭제하지 못했습니다.")
        })
    }
  }

  return (
    <div className='Box'>
      <h2><b>{props.postInfo.title}</b></h2><br/>
      <h5>작성자 : {props.postInfo.author.displayName}</h5>
      <br/>
        <p>{props.postInfo.image ? <img src={`http://localhost:5000/${props.postInfo.image}`}//서버의 static 이미지를 보여줌
          style={{ width: "40%", height: "auto" }} /> : null}</p>
      <p><div><h4>{props.postInfo.content}</h4></div></p>
      {user.uid === props.postInfo.author.uid &&  //게시물을 작성한 user의 uid가 존재할 경우에만 보여줌
        (<div className='TwoButtons'>
          <button id="modifyButton"><Link to={`/edit/${postNum}`}>수정</Link></button>
          <button onClick={() => Delete()}>삭제</button><br />
        </div>)}
    </div>
  )
}

export default Detail