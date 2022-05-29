import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import store from './reducer/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> {/*라우터 사용을 위한 모듈*/}
    <Provider store={store}> {/* provider로 감싸 준부분은 store를 사용할 수 있음*/}
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
);
