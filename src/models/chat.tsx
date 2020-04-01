import * as firebase from 'firebase/app';
import { TChatLastMessage } from './chat-last-message';

export interface TChat {
  cid: string;
  bid: string;
  uid: string;
  started: Date;
  ended: Date | null;
  isArchived: boolean;
  lastMessage: TChatLastMessage | null;
}

export const ChatConverter = {
  toFirestore(chat: TChat): firebase.firestore.DocumentData {
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
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TChat {
    const data = snapshot.data(options)!;
    var lm = data.lastMessage
      ? ({
          sender: data.lastMessage.sender,
          date: data.lastMessage.date ? data.lastMessage.date.toDate() : null,
          body: data.lastMessage.body
        } as TChatLastMessage)
      : null;
    return {
      cid: snapshot.id,
      bid: data.bid,
      uid: data.uid,
      started: data.started.toDate(),
      ended: data.ended ? data.ended.toDate() : null,
      isArchived: data.isArchived || false,
      lastMessage: lm
    } as TChat;
  }
};
