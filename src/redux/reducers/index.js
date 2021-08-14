import { combineReducers } from 'redux';
import { courseReducer } from './course';
import { subjectReducer } from './subject';

const rootReducer = combineReducers({ courseState: courseReducer, subjectState: subjectReducer });

export default rootReducer;
