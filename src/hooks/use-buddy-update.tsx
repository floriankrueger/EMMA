import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useTypedSelector } from '../store';
import { addBuddy, updateBuddy, deleteBuddy, resetBuddys } from '../store/buddy/actions';
import { startObserveBuddys } from '../firebase';

export function useBuddyUpdate() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoggedIn, uid] = useTypedSelector((state) => [state.authentication.isLoggedIn, state.authentication.user?.uid]);

  // subscribe to buddy updates
  useEffect(() => {
    if (isLoggedIn) {
      let stop = startObserveBuddys((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            dispatch(addBuddy(change.doc.data()));
          }
          if (change.type === 'modified') {
            dispatch(updateBuddy(change.doc.data()));
          }
          if (change.type === 'removed') {
            dispatch(deleteBuddy(change.doc.id));
          }
        });
      });
      return () => {
        stop();
        dispatch(resetBuddys());
      };
    }
  }, [dispatch, isLoggedIn, uid]);
}
