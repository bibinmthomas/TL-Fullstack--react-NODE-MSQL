import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDpDHw3ygTn8_19lldJglPYQSMcC7nKsUE",
  authDomain: "tl-full-stack.firebaseapp.com",
  projectId: "tl-full-stack",
  storageBucket: "tl-full-stack.appspot.com",
  messagingSenderId: "355154449384",
  appId: "1:355154449384:web:40802f80a6af99ddd40a5d",
  measurementId: "G-RP6169PST9",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
