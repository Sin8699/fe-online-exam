import { actionTypesUsers } from "../action/users";

const initialState = {
  users: [],
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesUsers.SET_USERS_SAGA: {
      return {
        ...state,
        users: action.data,
      };
    }

    default:
      return state;
  }
}
