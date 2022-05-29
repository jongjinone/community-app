import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'

const firebaseConfig = { //파이어베이스의 설정
  apiKey: "AIzaSyChPisCX9FUpHiAxijt9r4ncaC3mbgogUc",
  authDomain: "community-app-3dbb4.firebaseapp.com",
  projectId: "community-app-3dbb4",
  storageBucket: "community-app-3dbb4.appspot.com",
  messagingSenderId: "893628983450",
  appId: "1:893628983450:web:35cb3e6138ee441f4c1723",
  measurementId: "G-LFD8CMXLVD"
};


 firebase.initializeApp(firebaseConfig); //설정한 정보로 파이어베이스 초기화

 export default firebase;