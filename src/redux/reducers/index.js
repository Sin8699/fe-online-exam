import { combineReducers } from 'redux'
import { profileReducer } from './profile'

const rootReducer = combineReducers({
  profileState: profileReducer,
})

export default rootReducer
