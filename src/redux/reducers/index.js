import { combineReducers } from "redux";
import { profileReducer } from "./profile";
import { usersReducer } from "./users";

const rootReducer = combineReducers({
  profileState: profileReducer,
  userList: usersReducer,
});

export default rootReducer;
