import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../utils/api";
import axios from "axios";
import { addUserToStore, loading } from "../feature/userSlice";
import { addUsersToStore,loading as load  } from "../feature/userlistSlice";
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
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};

    const response = yield call(axios.get, `${api}/api/users/check/auth`, {
      headers: headers,
    });
    const { token, success } = yield response.data;
    console.log(response?.data)
    if (!success) {
      MyToast(response?.data.message, response.data.success ? "success" : "error");
    }

    if (token) {
      localStorage.setItem("token", token);
    }
    yield put(addUserToStore(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(loading(false));
  }
}
export function* userList() {
  yield put(load(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(axios.get, `${api}/api/users`, {
      headers: headers,
    });
    console.log(response.data)
    yield put(addUsersToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}
export function* deleteUser(action) {
  yield put(load(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(
      axios.delete,
      `${api}/api/users/${action.payload.id}`,
      { headers: headers }
    );
    action.payload.callBack(action.payload.id);
    yield put(load(false));

    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(load(false));
    MyToast(error.message, "error");
  }

}

export function* verifyUser(action) {
  // yield put(load(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(
      axios.put,
      `${api}/api/users/${action.payload.id}`,{},
      { headers: headers }
    );

    // yield put(load(false));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(load(false));
    MyToast(error.message, "error");
  }
}

export function* watcUserSaga() {
  yield takeEvery("user/login", handleLogin);
  yield takeEvery("user/register", handleRegister);
  yield takeEvery("user/check-auth", checkUser);
  yield takeEvery("usersList/user-list", userList);
  yield takeEvery("usersList/delete-user", deleteUser);
  yield takeEvery("usersList/verify-user", verifyUser);
  // yield takeEvery("usersList/block", blockUser);
  // yield takeEvery("usersList/unblock", unblockUser);

}
