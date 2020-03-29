import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseStore } from '../stores';
import { BuddyConverter, ChatConverter } from '../models';

export function startObserveBuddys(firebaseStore: FirebaseStore): () => void {
  return firebase
    .firestore()
    .collection('buddys')
    .withConverter(BuddyConverter)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          firebaseStore.addBuddy(change.doc.data());
        }
        if (change.type === 'modified') {
          firebaseStore.updateBuddy(change.doc.data());
        }
        if (change.type === 'removed') {
          firebaseStore.deleteBuddy(change.doc.data());
        }
      });
    });
}

export function startObserveChats(firebaseStore: FirebaseStore): () => void {
  return firebase
    .firestore()
    .collection('chats')
    .withConverter(ChatConverter)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          firebaseStore.addChat(change.doc.data());
        }
        if (change.type === 'modified') {
          firebaseStore.updateChat(change.doc.data());
        }
        if (change.type === 'removed') {
          firebaseStore.deleteChat(change.doc.data());
        }
      });
    });
}
