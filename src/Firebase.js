// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBMd0LVhXBF5pkwCPDdRSXtXvTImCjq3SQ",
  authDomain: "disnep-clone-62358.firebaseapp.com",
  projectId: "disnep-clone-62358",
  storageBucket: "disnep-clone-62358.appspot.com",
  messagingSenderId: "196949020926",
  appId: "1:196949020926:web:0c1801b3af8671cb9155af",
  measurementId: "G-6M81MNJNV9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider, db };
