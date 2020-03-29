import * as firebase from 'firebase/app';

export interface TChat {
  cid: string;
  bid: string;
  uid: string;
}

export const ChatConverter = {
  toFirestore(chat: TChat): firebase.firestore.DocumentData {
    return {
      bid: chat.bid,
      uid: chat.uid
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TChat {
    const data = snapshot.data(options)!;
    return {
      cid: snapshot.id,
      bid: data.bid,
      uid: data.uid
    } as TChat;
  }
};
