import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseStore } from '../stores';
import { BuddyConverter, ChatConverter, TChat } from '../models';

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
      firebaseStore.didFetchBuddys = true;
    });
}

export function startObserveChats(firebaseStore: FirebaseStore): () => void {
  const reference = firebase.firestore().collection('chats');
  let uid = firebaseStore.user?.uid;
  var query: firebase.firestore.Query;
  if (uid && firebaseStore.isWellKnown) {
    query = reference.where('bid', '==', uid);
  } else {
    query = reference.where('uid', '==', uid);
  }
  return query.withConverter(ChatConverter).onSnapshot(snapshot => {
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
    firebaseStore.didFetchChats = true;
  });
}

export function createChat(uid: string, bid: string) {
  return firebase
    .firestore()
    .collection('chats')
    .withConverter(ChatConverter)
    .add({
      cid: '', // this is actuall not used when sent to the backend
      uid,
      bid,
      started: new Date(),
      ended: null,
      isArchived: false,
      lastMessage: null
    } as TChat);
}

export function sendMessage(uid: string, cid: string, message: string) {
  const db = firebase.firestore();

  var batch = db.batch();

  const chatRef = db.collection(`chats`).doc(cid);
  batch.update(chatRef, {
    lastMessage: {
      sender: uid,
      body: message,
      date: firebase.firestore.FieldValue.serverTimestamp()
    }
  });

  const messageRef = db.collection(`chats/${cid}/messages`).doc();
  batch.set(messageRef, {
    sender: uid,
    body: message,
    date: firebase.firestore.FieldValue.serverTimestamp()
  });

  return batch.commit();
}
