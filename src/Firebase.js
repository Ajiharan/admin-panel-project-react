// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaqUVpjeHKCLKC0PirxZor40oIkrpiO-w",
  authDomain: "admin-panel-demo-8265f.firebaseapp.com",
  projectId: "admin-panel-demo-8265f",
  storageBucket: "admin-panel-demo-8265f.appspot.com",
  messagingSenderId: "710652057813",
  appId: "1:710652057813:web:86a3a310f2649eff0c2a5c",
  measurementId: "G-38K1WZBZC6",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider, db };
