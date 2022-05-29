import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header'
import Upload from './Components/Post/Upload'
import PostArea from './Components/Post/PostArea';
import Edit from './Components/Post/Edit';
import { useDispatch } from 'react-redux';
import { loginUser, clearUser } from './reducer/userSlice';
import firebase from './firebase.js';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import { useEffect } from 'react';
import MainPage from './Components/MainPage';

function App() {
  const dispatch = useDispatch()          //dispatch를 사용
  useEffect(()=>{
    firebase.auth().onAuthStateChanged( (userInfo)=>{ //실행결과에 따라 유저의 로그인 로그아웃 상태를 추적해주는 파이어베이스 함수
      if(userInfo !== null){ //user에 대한 정보가 존재하는 경우
        dispatch(loginUser(userInfo.multiFactor.user)) //유저의 정보를 dispatch를 통해 loginUser액션으로 보내줌.
      }else{
        dispatch(clearUser()) //유저가 없는 경우 logout액션을 보내줌.
      }
    }) 
  },[])

  return (         // 각각 경로에 따른 라우터 처리.
    <>
      <Header/>
      <Routes>
        <Route path = "/main" element={<MainPage/>}/>
        <Route path = "/upload" element={<Upload/>}/>        
        <Route path = "/post/:postNum" element={<PostArea/>}/>
        <Route path = "/edit/:postNum" element={<Edit/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
