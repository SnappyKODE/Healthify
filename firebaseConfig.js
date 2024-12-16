// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import {getFirestore , collection} from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGKQSGjeBiGBYNMvpsW0W2Hdhk1v443og",
  authDomain: "healthify-dfb9d.firebaseapp.com",
  projectId: "healthify-dfb9d",
  storageBucket: "healthify-dfb9d.firebasestorage.app",
  messagingSenderId: "377372098339",
  appId: "1:377372098339:web:4e4947caf9a8e6c6e8d696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')