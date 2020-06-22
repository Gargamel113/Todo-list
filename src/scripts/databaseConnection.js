import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQcwJeag6k1AS213MzP_DRjsiavwVgiuw",
    authDomain: "todol-77bee.firebaseapp.com",
    databaseURL: "https://todol-77bee.firebaseio.com",
    projectId: "todol-77bee",
    storageBucket: "todol-77bee.appspot.com",
    messagingSenderId: "281463826636",
    appId: "1:281463826636:web:7115bf8e2d6deb0ff3ba69"
  };

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let firestore = firebase.firestore;
export { db, firestore }; 