// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore/lite';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsZg5UW5Pr2M9XZt2cmpnRtpsukwSLrdA",
  authDomain: "fir-39576.firebaseapp.com",
  projectId: "fir-39576",
  storageBucket: "fir-39576.appspot.com",
  messagingSenderId: "1009823447803",
  appId: "1:1009823447803:web:1850a5f136af72eb198e5e",
  measurementId: "G-CFNHHP116G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const dataBase = getFirestore(app);
export let loggedInUserColl =  collection(dataBase,'loggedInUser');
export let commentsColl =  collection(dataBase,'comments');
export let likeVideoListColl =  collection(dataBase,'likeVideoList');
export let subscribedChnListColl =  collection(dataBase,'subscribedChnList');
firebase.initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export let db = firebase.firestore();
// signOut(auth)


