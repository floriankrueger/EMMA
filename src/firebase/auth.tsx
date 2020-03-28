import * as firebase from 'firebase/app';
import 'firebase/auth';

import { TUser } from '../models';

export function signInAnonymously() {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase.auth().signInAnonymously();
    })
    .catch(error => {
      console.error(error.message, error.code);
    });
}

export function signOut(callback: (success: boolean) => void) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      callback(true);
    })
    .catch(function(error) {
      console.error(error.message, error.code);
      callback(false);
    });
}

export function signInWithEmailAndPassword(email: string, password: string, rememberMe: boolean, callback: (success: boolean) => void) {
  firebase
    .auth()
    .setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then(() => {
      callback(true);
    })
    .catch(function(error) {
      console.error(error.message, error.code);
      callback(false);
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
