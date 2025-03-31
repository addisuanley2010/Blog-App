import { call, put, takeEvery } from "redux-saga/effects";
import { fetchPostSuccess, fetchPostFailure } from "../feature/postSlice"; // Adjust the import to your slicepost
import { api } from "../utils/api";
import axios from "axios";
// Worker saga
function* fetchPost(action) {
  try {
    const posts = yield call(fetch, `${api}/api/posts`);
    const postData = yield posts.json();
    yield put(fetchPostSuccess(postData));
  } catch (error) {
    yield put(fetchPostFailure(error.message));
  }
}

// Watcher saga
export function* watchPostSaga() {
  yield takeEvery("post/fetchPostRequest", fetchPost);
}
