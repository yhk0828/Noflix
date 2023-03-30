import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBvD4Sc9_TicR9HjHKCeztbkm3re_o0fIg",
    authDomain: "nwitter-7d1d8.firebaseapp.com",
    projectId: "nwitter-7d1d8",
    storageBucket: "nwitter-7d1d8.appspot.com",
    messagingSenderId: "36624501211",
    appId: "1:36624501211:web:8a4b1bd9d1d540ad82bffe"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = getStorage();
