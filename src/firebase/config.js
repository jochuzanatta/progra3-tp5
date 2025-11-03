import App from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD6VD1is-QeSCUtrBT_NI_A8SHa0R6iePY",
  authDomain: "progra3-tp5.firebaseapp.com",
  projectId: "progra3-tp5",
  storageBucket: "progra3-tp5.firebasestorage.app",
  messagingSenderId: "45761356421",
  appId: "1:45761356421:web:68d69ca38b5e30099dffec"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()