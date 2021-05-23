import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4Vxdg3t7xWToSN0smjt1OAL9kRygK5Xw",
  authDomain: "login-exacta.firebaseapp.com",
  projectId: "login-exacta",
  storageBucket: "login-exacta.appspot.com",
  messagingSenderId: "343145097056",
  appId: "1:343145097056:web:859ce72a2c660c1472a005",
  measurementId: "G-WCRBCCQPBM",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
