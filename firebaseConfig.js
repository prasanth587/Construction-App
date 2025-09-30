import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDi1ItEx7EC_VDSh6gIMhB0FFiYBVZgZCs",
  authDomain: "app-auth-3d45a.firebaseapp.com",
  projectId: "app-auth-3d45a",
  storageBucket: "app-auth-3d45a.appspot.com",
  messagingSenderId: "346645302720",
  appId: "1:346645302720:web:4721d1b26af258dcb38c25",
  measurementId: "G-5WPXJBM7V0"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
