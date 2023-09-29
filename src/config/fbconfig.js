import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'TUAUTH_API_KEY',
  authDomain: 'TU_DOMINIO.firebaseapp.com',
  projectId: 'TU_PROYECTO_ID',
  storageBucket: 'TU_PROYECTO_ID.appspot.com',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
