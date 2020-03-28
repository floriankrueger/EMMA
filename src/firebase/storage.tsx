import * as firebase from 'firebase/app';
import 'firebase/storage';

export function getDownloadUrl(reference: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    firebase
      .storage()
      .ref(reference)
      .getDownloadURL()
      .then(anything => {
        if (typeof anything === 'string') {
          resolve(anything);
        } else {
          reject(new Error(`Invalid return type (expected string, got ${typeof anything}`));
        }
      });
  });
}
