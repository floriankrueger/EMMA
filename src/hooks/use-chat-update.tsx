import { useEffect } from 'react';

import { FirebaseStore } from '../stores';
import { startObserveChats } from '../firebase';

export function useChatUpdate(firebaseStore: FirebaseStore) {
  const isLoggedIn = firebaseStore.isLoggedIn;
  const uid = firebaseStore.user?.uid;

  // subscribe to chat updates
  useEffect(() => {
    if (isLoggedIn && uid) {
      return startObserveChats(firebaseStore);
    }
  }, [firebaseStore, uid, isLoggedIn]);
}
