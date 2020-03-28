import { useEffect, useState } from 'react';

import { FirebaseStore } from '../stores';
import { onAuthStateChanged, signInAnonymously } from '../firebase';

export function useAuthState(firebaseStore: FirebaseStore) {
  const [didFetchAuthState, setDidFetchAuthState] = useState(false);
  const uid = firebaseStore.user?.uid;

  // subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      setDidFetchAuthState(true);
      if (user) {
        firebaseStore.userSignedIn(user);
      } else {
        firebaseStore.userSignedOut();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [firebaseStore, uid]);

  // sign in anonymously if necessary
  useEffect(() => {
    if (didFetchAuthState && firebaseStore.isLoggedOut) {
      signInAnonymously();
    }
  });

  return firebaseStore.user;
}
