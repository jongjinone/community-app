import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './Post/List'
import '../Style/MainPage.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const [sort, setSort] = useState("최신순")
    const [sortState, setSortState] = useState(true)
    const [postList, setPostList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [skip, setSkip] = useState(0)
    const [loadMore, setLoadMore] = useState(true)

    const navigate = useNavigate()
    const user = useSelector(state => state.user)  //user store에 접근

    useEffect(() => {   //로그인 유저만 허용함.
        if (!user.accessToken) {
            alert("로그인된 회원만 이용할 수 있습니다.")
            navigate('/login')
        }
    }, [])

    const getLoadMore = () => { //더보기 버튼을 누를 때마다 실행됨.
        let body = {
            sort: sort,
            searchTerm: searchTerm,
            skip: skip
        }
        axios.post('/api/post/list', body)
            .then(res => {
                setPostList([...postList, ...res.data.postList])
                setSkip(skip + res.data.postList.length)
                if (res.data.postList.length < 3) {
                    setLoadMore(false)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const getPostList = () => {
        setSkip(0) //skip을 0으로 설정
        let body = {      //정렬방법과 검색어, skip을 같이 보냄.
            sort: sort,
            searchTerm: searchTerm,
            skip: 0
        }
        axios.post('/api/post/list', body) //서버에 전송
            .then(res => {
                setPostList([...res.data.postList])
                setSkip(res.data.postList.length)
                if (res.data.postList.length < 3) {
                    setLoadMore(false)
                }else{
                    setLoadMore(true)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {  //sort가 변경될 때마다 함수를 실행
        getPostList()
    }, [sort])

    return (
        <div>
            <div className='SearchAndArrange'>
                <button disabled={sortState} onClick={() => { setSort("최신순"); setSortState(true) }}>최신순</button>
                <button disabled={!sortState} style={{ marginLeft: "5px", marginRight: "20px" }} onClick={() => { setSort("인기순"); setSortState(false) }}>인기순</button>
                <input style={{ marginRight: "5px" }} placeholder='제목 또는 내용' type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button onClick={() => getPostList()}>검색</button>
                <button style={{ marginLeft: "10px" }} onClick={() => navigate('/upload')}>게시글 작성</button>
            </div>
            <List postList={postList} />
            {loadMore && (<button className='SeeMore' onClick={() => getLoadMore()}>더 보기</button>)}
        </div>
    )
}

export default MainPage