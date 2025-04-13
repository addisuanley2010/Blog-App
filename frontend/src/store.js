
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postReducer from './feature/postSlice';
import rootSaga from './saga'; 
const sagaMiddleware = createSagaMiddleware();
import userReducer from './feature/userSlice';
import userListReducer from './feature/userlistSlice';

const store = configureStore({
  reducer: {
    postData: postReducer,
    userData: userReducer,
    usersList: userListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
  
});

sagaMiddleware.run(rootSaga);

export default store;