import { actionTypesSubject } from '../action/subject';

const initialState = {
  dataSagaSubject: [],
};

export function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesSubject.SET_SUBJECT_SAGA: {
      return {
        ...state,
        dataSagaSubject: action.data,
      };
    }
    default:
      return state;
  }
}
