// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyADFMKONyn2OQnhrXQhtW1_FAFQo0U6wcU",

  authDomain: "easymanager-7844d.firebaseapp.com",

  projectId: "easymanager-7844d",

  storageBucket: "easymanager-7844d.appspot.com",

  messagingSenderId: "723121959300",

  appId: "1:723121959300:web:d6bb15849d47c8ceab6dd1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);