import { AuthenticationState, AuthenticationActionTypes, USER_LOGIN, USER_LOGOUT } from './types';

const initialState: AuthenticationState = {
  user: null,
  isLoggedIn: false,
  isLoggedOut: true
};

export function authenticationReducer(state = initialState, action: AuthenticationActionTypes): AuthenticationState {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoggedOut: false
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isLoggedOut: true
      };
    default:
      return state;
  }
}
