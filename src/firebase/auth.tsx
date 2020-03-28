import * as firebase from 'firebase/app';
import 'firebase/auth';

import { TUser } from '../models';

export function signInAnonymously() {
  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      console.error(error.message, error.code);
    });
}

export function onAuthStateChanged(callback: (user: TUser | null) => void): firebase.Unsubscribe {
  const u = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({
        uid: user.uid,
        isAnonymous: user.isAnonymous
      });
    } else {
      callback(null);
    }
  });
  return () => {
    u();
  };
}
