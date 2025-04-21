import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGoejRPaOH1dEn4SIbqG0hAGcZ3QDfCbw",
  authDomain: "desktime-e2f82.firebaseapp.com",
  projectId: "desktime-e2f82",
  storageBucket: "desktime-e2f82.firebasestorage.app",
  messagingSenderId: "919347454139",
  appId: "1:919347454139:web:c55a21bfdabd4520a9099e",
  measurementId: "G-P1GVXV0MLW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
