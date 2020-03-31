import { useEffect } from 'react';

import { FirebaseStore } from '../stores';
import { startObserveBuddys } from '../firebase';

export function useBuddyUpdate(firebaseStore: FirebaseStore) {
  const isLoggedIn = firebaseStore.isLoggedIn;
  const uid = firebaseStore.user?.uid;

  // subscribe to buddy updates
  useEffect(() => {
    if (isLoggedIn) {
      return startObserveBuddys(firebaseStore);
    }
  }, [firebaseStore, isLoggedIn, uid]);
}
