// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDOvaJWff5qKqkXGdDdqg2A8dyxAIrsQ7M",
    authDomain: "non-profit-organization-233f8.firebaseapp.com",
    projectId: "non-profit-organization-233f8",
    storageBucket: "debate-forum-57967.appspot.com", // FIXED URL
    messagingSenderId: "765065045740",
    appId: "1:765065045740:web:d9884c0fe9157c797567c9",
    databaseURL: "https://non-profit-organization-233f8-default-rtdb.europe-west1.firebasedatabase.app/",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
