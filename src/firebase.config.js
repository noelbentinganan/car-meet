import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLR4R66b0UL9KAa9V3Dtn3g-lZzAmhsvQ",
  authDomain: "car-meet-effc2.firebaseapp.com",
  projectId: "car-meet-effc2",
  storageBucket: "car-meet-effc2.firebasestorage.app",
  messagingSenderId: "469003873377",
  appId: "1:469003873377:web:e699beb6627e3851cc4e20",
  measurementId: "G-79HNNGFZ2C",
};

// Initialize Firebase
// initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);
