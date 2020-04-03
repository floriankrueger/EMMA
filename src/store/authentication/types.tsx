// State Types

export interface User {
  uid: string;
  isAnonymous: boolean;
  isWellKnown: boolean;
}

export interface AuthenticationState {
  user: User | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
}

// Action Types

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

interface UserLoginAction {
  type: typeof USER_LOGIN;
  payload: User;
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

export type AuthenticationActionTypes = UserLoginAction | UserLogoutAction;
