import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhhFu9KK6_ntzKKwv0T5ShbXDukw1rfto',
  authDomain: 'clone-349cb.firebaseapp.com',
  projectId: 'clone-349cb',
  storageBucket: 'clone-349cb.appspot.com',
  messagingSenderId: '183271863372',
  appId: '1:183271863372:web:3750fd85c36641dc21f0e9',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
