import { User, USER_LOGIN, USER_LOGOUT, AuthenticationActionTypes } from './types';

export function userLogin(user: User): AuthenticationActionTypes {
  return {
    type: USER_LOGIN,
    payload: user
  };
}

export function userLogout(): AuthenticationActionTypes {
  return {
    type: USER_LOGOUT
  };
}
