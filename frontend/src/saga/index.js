
import { all } from "redux-saga/effects";
import { watcUserSaga } from "./userSaga";
import {watchPostSaga} from "./postSaga"
export default function* rootSaga() {
  yield all([
     watchPostSaga(),
     watcUserSaga(),
  ]);
}
