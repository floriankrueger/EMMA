import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
// import "firebase/firestore";

export function initialize() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let app = firebase.app();
  let features = [
    { feature: app.auth, name: 'auth' },
    { feature: app.database, name: 'database' },
    { feature: app.messaging, name: 'messaging' },
    { feature: app.storage, name: 'storage' }
  ]
    .filter(feature => typeof feature.feature === 'function')
    .map(feature => feature.name);
  console.log(`Firebase SDK loaded with ${features.join(', ')}`);
}
