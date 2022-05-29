import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, } from 'react-bootstrap'
import { useSelector } from "react-redux";
import firebase from "../firebase";

const Header = () => {
    const navigate= useNavigate()
    const user = useSelector(state => state.user) //store에서 state를 가져오기 위한 설정.
    const Logout = ()=>{
         firebase.auth().signOut() //사용자를 로그아웃시키는 파이어베이스 함수
         alert("로그아웃 되었습니다.")
         navigate('/') // 홈으로 이동
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/main' style={{color: "white", textDecoration:"none", marginRight: "10px"}}>커뮤니티</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">        {/*Link태그는 주소만 바뀌고 페이지를 새로고침하지 않는다. */}
                        <Nav.Link><Link to="/main" style={{color: "white", textDecoration:"none", marginRight: "10px"}}>Home</Link></Nav.Link>
                           <Nav.Link><Link to="/upload" style={{color: "white", textDecoration:"none", marginRight: "10px"}}>Upload</Link></Nav.Link>  
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {user.accessToken ===""
                        ? <Nav.Link><Link to="/login" style={{color: "white", textDecoration:"none"}}>로그인</Link></Nav.Link> 
                        : <Navbar.Text style={{color : "white", cursor: "pointer"}} onClick={()=>Logout()}>Logout</Navbar.Text>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header