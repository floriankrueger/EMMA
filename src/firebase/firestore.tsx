import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { BuddyConverter } from '../models';
import { FirebaseStore } from '../stores';

export function startObserveBuddys(firebaseStore: FirebaseStore): () => void {
  return firebase
    .firestore()
    .collection('buddys')
    .withConverter(BuddyConverter)
    .onSnapshot(snapshot => {
      var buddies = firebaseStore.buddys;
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log(`added buddy ${change.doc.id}`);
          buddies.push(change.doc.data());
        }
        if (change.type === 'modified') {
          console.log(`modified buddy ${change.doc.id}`);
          const index = buddies.findIndex(buddy => buddy.bid === change.doc.id);
          if (index) {
            buddies.splice(index, 1, change.doc.data());
          } else {
            buddies.push(change.doc.data());
          }
        }
        if (change.type === 'removed') {
          console.log(`removed buddy ${change.doc.id}`);
          const index = buddies.findIndex(buddy => buddy.bid === change.doc.id);
          if (index) {
            buddies.splice(index, 1);
          }
        }
      });
      firebaseStore.setBuddys(buddies);
    });
}
