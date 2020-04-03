import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { TBuddy, BuddyConverter, ConversationConverter, TConversation } from '../models';

type BuddyQuerySnapshot = (snapshot: firebase.firestore.QuerySnapshot<TBuddy>) => void;
export function startObserveBuddys(onSnapshot: BuddyQuerySnapshot): () => void {
  return firebase
    .firestore()
    .collection('buddys')
    .withConverter(BuddyConverter)
    .onSnapshot(onSnapshot);
}

type ConversationQuerySnapshot = (snapshot: firebase.firestore.QuerySnapshot<TConversation>) => void;
export function startObserveChats(uid: string, isWellKnown: boolean, onSnapshot: ConversationQuerySnapshot): () => void {
  const reference = firebase.firestore().collection('chats');
  var query: firebase.firestore.Query;
  if (uid && isWellKnown) {
    query = reference.where('bid', '==', uid);
  } else {
    query = reference.where('uid', '==', uid);
  }
  return query.withConverter(ConversationConverter).onSnapshot(onSnapshot);
}

export function createChat(uid: string, bid: string) {
  return firebase
    .firestore()
    .collection('chats')
    .withConverter(ConversationConverter)
    .add({
      cid: '', // this is actuall not used when sent to the backend
      uid,
      bid,
      started: new Date(),
      ended: null,
      isArchived: false,
      lastMessage: null
    } as TConversation);
}

export function sendMessage(uid: string, cid: string, message: string) {
  const db = firebase.firestore();

  var batch = db.batch();

  const chatRef = db.collection('chats').doc(cid);
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

export function archiveChat(cid: string) {
  return firebase
    .firestore()
    .collection('chats')
    .doc(cid)
    .update({
      isArchived: true,
      ended: firebase.firestore.FieldValue.serverTimestamp()
    });
}
