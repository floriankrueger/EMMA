import * as firebase from 'firebase/app';

export interface TMessage {
  mid: string;
  sender: string;
  body: string;
  date: Date;
}

export const MessageConverter = {
  toFirestore(message: TMessage): firebase.firestore.DocumentData {
    return {
      sender: message.sender,
      body: message.body,
      date: message.date
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TMessage {
    const data = snapshot.data(options)!;
    return {
      mid: snapshot.id,
      sender: data.sender,
      body: data.body,
      date: data.date
    } as TMessage;
  }
};
