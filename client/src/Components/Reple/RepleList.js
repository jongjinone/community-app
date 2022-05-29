import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Replecontent from './Replecontent'

function RepleList(props) { //props로 게시물의 id를 가져옴.
    const [repleList, setRepleList] = useState([])
    useEffect(() => {
        let body = {
            postId: props.postId
        }
        axios.post("/api/reple/getReple", body).then(res => { //게시물 id를 서버에 전송하여 리스트를 설정함.
            setRepleList([...res.data.repleList])
        })
    }, [])
    return (
        <div>
            {repleList.map((obj, idx) => {
                return (
                    <Replecontent reple={obj} key={idx}/>
                )
            })}
        </div>
    )
}

export default RepleList