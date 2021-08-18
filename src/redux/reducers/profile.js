import { actionTypesProfile } from "../action/profile";

const initialState = {
  profile: [],
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesProfile.SET_PROFILE_SAGA: {
      return {
        ...state,
        profile: action.data,
      };
    }
    default:
      return state;
  }
}
