import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDH_yhN9VsCI1mVSwvtNFxGAGSjOEwQXeE",
  authDomain: "streaks-clone.firebaseapp.com",
  databaseURL: "https://streaks-clone.firebaseio.com",
  projectId: "streaks-clone",
  storageBucket: "streaks-clone.appspot.com",
  messagingSenderId: "465982767596",
  appId: "1:465982767596:web:e999079a66255a4a5cc0c9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database;
