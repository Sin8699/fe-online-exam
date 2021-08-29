import { all } from 'redux-saga/effects'
import { profileSaga } from './profile'

function* rootSaga() {
  yield all([profileSaga()])
}

export default rootSaga
