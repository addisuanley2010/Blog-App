
import watchFetchPost from "./postSaga";
// Root saga
export default function* rootSaga() {
  yield watchFetchPost();
}