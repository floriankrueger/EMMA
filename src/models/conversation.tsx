import * as firebase from 'firebase/app';
import { TMessage } from './message';

export interface TConversation {
  cid: string;
  bid: string;
  uid: string;
  started: Date;
  ended: Date | null;
  isArchived: boolean;
  lastMessage: TMessage | null;
}

export const ConversationConverter = {
  toFirestore(chat: TConversation): firebase.firestore.DocumentData {
    var lm = chat.lastMessage
      ? {
          sender: chat.lastMessage.sender,
          date: firebase.firestore.Timestamp.fromDate(chat.lastMessage.date),
          body: chat.lastMessage.body
        }
      : null;
    return {
      bid: chat.bid,
      uid: chat.uid,
      started: firebase.firestore.Timestamp.fromDate(chat.started),
      ended: chat.ended ? firebase.firestore.Timestamp.fromDate(chat.ended) : null,
      isArchived: chat.isArchived,
      lastMessage: lm
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TConversation {
    const data = snapshot.data(options)!;
    var lm = data.lastMessage
      ? ({
          sender: data.lastMessage.sender,
          date: data.lastMessage.date ? data.lastMessage.date.toDate() : null,
          body: data.lastMessage.body
        } as TMessage)
      : null;
    return {
      cid: snapshot.id,
      bid: data.bid,
      uid: data.uid,
      started: data.started.toDate(),
      ended: data.ended ? data.ended.toDate() : null,
      isArchived: data.isArchived || false,
      lastMessage: lm
    } as TConversation;
  }
};
