import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC20G69Lh7j8oAmZAzFmzLaBTCqw5mYNZo",
  authDomain: "landpage-logo-agiliza.firebaseapp.com",
  projectId: "landpage-logo-agiliza",
  storageBucket: "landpage-logo-agiliza.firebasestorage.app",
  messagingSenderId: "1013027323034",
  appId: "1:1013027323034:web:8184b993b1ab707c203323"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const isFirebaseConfigured = true;
