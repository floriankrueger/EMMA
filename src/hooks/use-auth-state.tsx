import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useTypedSelector } from '../store';
import { userLogin, userLogout } from '../store/authentication/actions';
import { onAuthStateChanged, signInAnonymously } from '../firebase';

export function useAuthState() {
  const dispatch: AppDispatch = useDispatch();
  const [uid, user, isLoggedOut] = useTypedSelector((state) => [state.authentication.user?.uid, state.authentication.user, state.authentication.isLoggedOut]);
  const [didFetchAuthState, setDidFetchAuthState] = useState(false);

  // subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setDidFetchAuthState(true);
      if (user) {
        dispatch(
          userLogin({
            uid: user.uid,
            isAnonymous: user.isAnonymous,
            isWellKnown: !user.isAnonymous,
          })
        );
      } else {
        dispatch(userLogout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, uid]);

  // sign in anonymously if necessary
  useEffect(() => {
    if (didFetchAuthState && isLoggedOut) {
      signInAnonymously();
    }
  });

  return user;
}
