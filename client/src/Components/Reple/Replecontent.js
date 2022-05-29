import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../../Style/Replecontent.css'
import moment from 'moment'

function Replecontent(props) {//props로 유저와 게시물 id가 포함된 댓글정보의 리스트가 넘어옴
    const [state, setState] = useState(false)
    const ref = useRef()
    const user = useSelector(state => state.user) //user의 store 사용
    const [editFlag, setEditFlag] = useState(false)
    const [reple, setReple] = useState(props.reple.reple)

    useOnclickOutside(ref, () => setState(false)) //구글링으로 긁어온 함수

    const RepleTime = (createTime, updateTime)=>{
        if(createTime!==updateTime){
            return moment(updateTime).format('YYYY MMMM Do, a hh:mm:ss')+'(수정됨)'
        }else{
            return moment(createTime).format('YYYY MMMM Do, a hh:mm:ss')
        }
    }

    const RepleDel = (e) => {
        e.preventDefault()
        if(window.confirm("삭제하시겠습니까?")){
            let body = {
                repleId : props.reple._id,
                postId : props.reple.postId
            }
            axios.post("/api/reple/delete", body)
                .then(res => {
                    alert("댓글이 삭제되었습니다.")
                    window.location.reload()
    
                }).catch(err => {
                    alert("댓글을 삭제하지 못했습니다.")
                })
        }
        return
    }

    const RepleMod = (e) => {
        e.preventDefault()
        if (!reple) {
            return alert("댓글을 작성해주세요.")
        }
        let body = {
            reple: reple,
            uid: user.uid,
            postId: props.reple.postId,
            repleId: props.reple._id
        }

        axios.post('/api/reple/edit', body).then((res) => {
            alert("댓글을 수정하였습니다.")
            window.location.reload()
        }).catch(err => {
            alert("댓글 수정에 실패했습니다.")
        })
    }

    return (
        <div>

            <hr /><p><b>{props.reple.author.displayName}</b></p>

            {editFlag ? (   // editFlag에 따라 수정, 취소를 보여줌. 
                <div>
                    <form>
                        <input type="text" value={reple} onChange={(e) => setReple(e.target.value)} />
                        <button onClick={(e) => { RepleMod(e) }}>수정</button>
                    </form>
                    <button onClick={(e) => { e.preventDefault(); setEditFlag(false) }}>취소</button>
                </div>)
                : <div>
                    <p>{props.reple.reple}</p> 
                    <div>{RepleTime(props.reple.createdAt, props.reple.updatedAt)}</div>
                    </div>}

            {    //넘어온 댓글 정보의 사용자 uid 현재 사용자의 uid가 일치하는 경우
                props.reple.author.uid === user.uid && <div className='OnCursor'>  
                    <span onClick={() => setState(!state)}><b>...</b></span>
                    {state &&
                        <div ref={ref}>
                            <p onClick={() => { setEditFlag(true); setState(false) }}>수정</p> {/* 수정이 클릭되면 수정창을 보여줌 */}
                            <p onClick={(e) => RepleDel(e)}>삭제</p>
                        </div>}
                </div>
            }
        </div>
    )
}

function useOnclickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return
            }
            handler(e)
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("mousedown", listener)
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    },
        [ref, handler])
}

export default Replecontent