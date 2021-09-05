import { all } from "redux-saga/effects";
import { profileSaga } from "./profile";
import { usersSaga } from "./users";

function* rootSaga() {
  yield all([profileSaga(), usersSaga()]);
}

export default rootSaga;
