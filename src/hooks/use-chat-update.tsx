import { useEffect } from 'react';

import { FirebaseStore } from '../stores';
import { startObserveChats } from '../firebase';

export function useChatUpdate(firebaseStore: FirebaseStore) {
  const isLoggedIn = firebaseStore.isLoggedIn;
  const didFetchBuddys = firebaseStore.didFetchBuddys;
  const uid = firebaseStore.user?.uid;

  // subscribe to chat updates
  useEffect(() => {
    if (isLoggedIn && uid && didFetchBuddys) {
      return startObserveChats(firebaseStore);
    }
  }, [firebaseStore, uid, isLoggedIn, didFetchBuddys]);
}
