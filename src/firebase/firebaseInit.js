import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArE_heer99PwmrKOQ78ej9vfoaGX4QcmY",
  authDomain: "blog-website-firebase.firebaseapp.com",
  projectId: "blog-website-firebase",
  storageBucket: "blog-website-firebase.appspot.com",
  messagingSenderId: "1001984117108",
  appId: "1:1001984117108:web:ccfb3e78e07ba5be3dc421"
};

/* const firebaseConfig = {
  apiKey: "AIzaSyBcqUAddBiWbJUP40tlXjDB65m8hL9fPag",
  authDomain: "blog-function.firebaseapp.com",
  projectId: "blog-function",
  storageBucket: "blog-function.appspot.com",
  messagingSenderId: "439025375275",
  appId: "1:439025375275:web:a35ef6bf8b0035278c726e"
}; */

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export {
  timestamp
};
export default firebaseApp.firestore();