import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuIPupGPlvJ3519NyzhCFnOLKssjS9nHM",
  authDomain: "notestracker-1757f.firebaseapp.com",
  projectId: "notestracker-1757f",
  storageBucket: "notestracker-1757f.appspot.com",
  messagingSenderId: "951262611491",
  appId: "1:951262611491:web:dc350c0731e0c28b9d8996",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
