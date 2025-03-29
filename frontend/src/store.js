
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postReducer from './feature/postSlice';
import rootSaga from './saga'; 
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    postData: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
});

sagaMiddleware.run(rootSaga);

export default store;