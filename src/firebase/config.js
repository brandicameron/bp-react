import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC824t0c0KHHFjqUmbJ8MQDDYDeATpeqdc',
  authDomain: 'bp-readings-70ed2.firebaseapp.com',
  projectId: 'bp-readings-70ed2',
  storageBucket: 'bp-readings-70ed2.appspot.com',
  messagingSenderId: '1059047326555',
  appId: '1:1059047326555:web:de84764b67653cbb8d507e',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
