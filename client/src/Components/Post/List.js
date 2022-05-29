import React  from "react";
import { ListItem, ListDiv } from "../../Style/ListCSS";
import { Link } from "react-router-dom";
import moment from 'moment'
import 'moment/locale/ko'

const List = (props) => {  //메인페이지로부터 props를 받음 props.postList에는 게시물 정보 객체들이 배열로 저장되어 있음.

    const UploadTime = (createTime, updateTime)=>{
        if(createTime!==updateTime){
            return moment(updateTime).format('YYYY년 MMMM Do, a hh시 mm분 ss초')+'(수정됨)'
        }else{
            return moment(createTime).format('YYYY년 MMMM Do, a hh시 mm분 ss초')
        }
    }
    return (
        <ListDiv>
        <h3>게시글</h3>
        <hr/>
            {
                props.postList.map((post, idx) => {      //배열을 하나하나 mapping. post는 해당 순서의 변수, idx는 해당 순서
                    return (
                        <ListItem key={idx}>
                            <Link to={`/post/${post.postNum}`}> {/* 클릭하면 게시물의 번호대로 이동 */}
                            <p className="title"> <h4> <b>{post.title} </b></h4></p>
                            <p>작성자 : {post.author.displayName}</p>
                            <p>{post.content}</p>
                            <p>{UploadTime(post.createdAt, post.updatedAt)}</p>
                            <hr />
                            </Link>
                        </ListItem>
                    )
                })
            }
        </ListDiv>
    )
}

export default List