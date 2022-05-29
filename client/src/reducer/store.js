import {configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import userSlice from "./userSlice" //생성한 slice를 불러옴

const reducers = combineReducers({
    user : userSlice  // 불러온 slice의 reducer를 store에 매핑해 줌
})

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({ //configure를 통해 store를 생성
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>       
        getDefaultMiddleware({
            serializableCheck :false   //비직렬화데이터 체크를 해제해주는 기본 미들웨어 설정
        }),
})