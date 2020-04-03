import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useTypedSelector } from '../store';
import { addConversation, updateConversation, deleteConversation, resetConversations } from '../store/conversation/actions';
import { startObserveChats } from '../firebase';

export function useChatUpdate() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoggedIn, uid, isWellKnown, didFetchBuddys] = useTypedSelector((state) => [
    state.authentication.isLoggedIn,
    state.authentication.user?.uid,
    state.authentication.user?.isWellKnown || false,
    state.buddy.didFetchBuddys,
  ]);

  // subscribe to chat updates
  useEffect(() => {
    if (isLoggedIn && uid && didFetchBuddys) {
      const stop = startObserveChats(uid, isWellKnown, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            dispatch(addConversation(change.doc.data()));
          }
          if (change.type === 'modified') {
            dispatch(updateConversation(change.doc.data()));
          }
          if (change.type === 'removed') {
            dispatch(deleteConversation(change.doc.id));
          }
        });
      });
      return () => {
        stop();
        dispatch(resetConversations());
      };
    }
  }, [dispatch, uid, isLoggedIn, isWellKnown, didFetchBuddys]);
}
