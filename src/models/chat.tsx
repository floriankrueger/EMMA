import * as firebase from 'firebase/app';

export interface TChat {
  cid: string;
  bid: string;
  uid: string;
  isArchived: boolean;
}

export const ChatConverter = {
  toFirestore(chat: TChat): firebase.firestore.DocumentData {
    return {
      bid: chat.bid,
      uid: chat.uid,
      isArchived: chat.isArchived
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TChat {
    const data = snapshot.data(options)!;
    return {
      cid: snapshot.id,
      bid: data.bid,
      uid: data.uid,
      isArchived: data.isArchived || false
    } as TChat;
  }
};
