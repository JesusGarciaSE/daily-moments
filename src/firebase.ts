import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCwCv3GbuWAhr4Oix3Lvdpj7Imxb1a6DQs",
    authDomain: "daily-moments-1a056.firebaseapp.com",
    projectId: "daily-moments-1a056",
    storageBucket: "daily-moments-1a056.appspot.com",
    messagingSenderId: "208906914199",
    appId: "1:208906914199:web:691d9df0d639364d5d5cd2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);