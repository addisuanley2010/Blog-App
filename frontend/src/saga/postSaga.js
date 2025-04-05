import { call, put, takeEvery } from "redux-saga/effects";
import { fetchPostSuccess, fetchPostFailure ,fetchPostRequest} from "../feature/postSlice"; // Adjust the import to your slicepost
import { api } from "../utils/api";
import axios from "axios";
import MyToast from "../utils/MyToast";
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

function* createPost(action) {
  try {    
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = yield call(
      axios.post,
      `${api}/api/posts`,
      action.formData,
      { headers }
    );
    yield put(fetchPostSuccess(response.data));
    MyToast("Post created successfully", "success");
  } catch (error) {
    MyToast(error.message, "error");
    yield put(fetchPostFailure(error.message));
  }
}

function* fetchMyPost(action) {
  try {
   yield put(fetchPostRequest())
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = yield call(
      axios.get,
      `${api}/api/posts/mypost/posts`,
      { headers }
    );
    yield put(fetchPostSuccess(response.data));
  } catch (error) {
    yield put(fetchPostFailure(error.message));
  }
}

function* likePost(action) {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = yield call(
      axios.post,
      `${api}/api/likes/${action.payload.postId}`,
      {},
      { headers });
    action.payload.callback();
    MyToast(response.data.message, response.data.success ? "success" : "warning");
  } catch (error) {
    MyToast(error.message, "error");
    yield put(fetchPostFailure(error.message));
  }
}
function* commentPost(action) {
  try {
    console.log(action)
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = yield call(axios.post, `${api}/api/comments/${action.payload.postId}`, { content: action.payload.comment }, { headers });
    action.payload.callback();
    MyToast(response.data.message, response.data.success ? "success" : "warning");
  } catch (error) {
    MyToast(error.message, "error");
    yield put(fetchPostFailure(error.message));
  }
}

// Watcher saga
export function* watchPostSaga() {
  yield takeEvery("post/fetchPostRequest", fetchPost);
  yield takeEvery("post/createPost", createPost);
  yield takeEvery("post/myPost", fetchMyPost);
  yield takeEvery("post/like", likePost);
  yield takeEvery("post/comment", commentPost);
  // yield takeEvery("post/deletePost", deletePost);
  // yield takeEvery("post/updatePost", updatePost);
  // yield takeEvery("post/getPostById", getPostById);
  // yield takeEvery("post/getPostByauthorId", getPostById);





}
