import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { TMessageGroup, appendToMessageGroups, updateInMessageGroups, removeFromMessageGroups, MessageConverter } from '../models';

export function useMessageGroups(isLoggedIn: boolean, cid: string) {
  const [messageGroups, setMessageGroups] = useState<TMessageGroup[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    let stop = firebase
      .firestore()
      .collection(`chats/${cid}/messages`)
      .orderBy('date')
      .withConverter(MessageConverter)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const message = change.doc.data();
          if (change.type === 'added') {
            setMessageGroups(messageGroups => appendToMessageGroups(message, messageGroups));
          }
          if (change.type === 'modified') {
            setMessageGroups(messageGroups => updateInMessageGroups(message, messageGroups));
          }
          if (change.type === 'removed') {
            setMessageGroups(messageGroups => removeFromMessageGroups(message, messageGroups));
          }
        });
      });
    return () => {
      setMessageGroups([]);
      stop();
    };
  }, [cid, isLoggedIn]);

  return messageGroups;
}
