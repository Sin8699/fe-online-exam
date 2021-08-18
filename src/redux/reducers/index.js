import { combineReducers } from "redux";
import { courseReducer } from "./course";
import { subjectReducer } from "./subject";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
  courseState: courseReducer,
  subjectState: subjectReducer,
  profileState: profileReducer,
});

export default rootReducer;
