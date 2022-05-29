import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({ //slice는 reducer의 action과 payload를 관리
    name: "user", //slice 이름
    initialState: {
        displayName: "",
        uid: "",                         // 관리할 데이터 상태 초기화
        accessToken: ""
    },
    reducers: { //각각 action의 동작 실행
        loginUser: (state, action) => {            
            state.displayName = action.payload.displayName; //액션을 통해 받아온 payload의 Name을 저장
            state.uid = action.payload.uid;                 //액션을 통해 받아온 payload의 uidfmf 저장
            state.accessToken = action.payload.accessToken; //액션을 통해 받아온 payload의 토큰을 저장
        }, 
        clearUser: (state) => {       //유저 정보를 지우는 action 동작
            state.displayName = ""; 
            state.uid = "";
            state.accessToken = "";
        }
    }
})

export const {loginUser, clearUser} = userSlice.actions  //생성한 slice의 reducer를 액션으로 export함
export default userSlice.reducer  //생성한 slice의 reducer를 export함