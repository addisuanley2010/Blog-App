import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../utils/api";
import axios from "axios";
import { addUserToStore, loading } from "../feature/userSlice";
import MyToast from "../utils/MyToast";

function* handleLogin(action) {
  yield put(loading(true));

  try {
    const response = yield call(
      axios.post,
      `${api}/api/users/login`,
      action.formData
    );
    const { token } = yield response.data;
    if (token) {
      localStorage.setItem("token", token);
    }
    yield put(addUserToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}
export function* handleRegister(action) {
  console.log(action)
  yield put(loading(true));
  try {
    const response = yield call(
      axios.post,
      `${api}/api/users`,
      action.userData
    );
    yield put(addUserToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}
export function* checkUser() {
  yield put(loading(true));
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = yield call(axios.get, `${api}/api/users/check/auth`, {
      headers: headers,
    });
    yield put(addUserToStore(response.data));
    console.log(response.data);
  } catch (error) {
    console.log(error);
    yield put(loading(false));
  }
}

export function* watcUserSaga() {
  yield takeEvery("user/login", handleLogin);
  yield takeEvery("user/register", handleRegister);
  yield takeEvery("user/check-auth", checkUser);
}
