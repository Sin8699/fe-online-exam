import { actionTypesCourse } from '../action/course';

const initialState = {
  dataSagaCourse: [],
};

export function courseReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesCourse.SET_COURSE_SAGA: {
      return {
        ...state,
        dataSagaCourse: action.data,
      };
    }
    default:
      return state;
  }
}
