import { useEffect } from 'react';

import { FirebaseStore } from '../stores';
import { startObserveBuddys } from '../firebase';

export function useBuddyUpdate(firebaseStore: FirebaseStore) {
  const isLoggedIn = firebaseStore.isLoggedIn;

  // subscribe to buddy updates
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    return startObserveBuddys(firebaseStore);
  }, [firebaseStore, isLoggedIn]);
}
