import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDyXV2d5zefNA7g2aTPL33U62P9b6dNBpI",
    authDomain: "fir-demo-7951e.firebaseapp.com",
    projectId: "fir-demo-7951e",
    storageBucket: "fir-demo-7951e.appspot.com",
    messagingSenderId: "31095432618",
    appId: "1:31095432618:web:8885ca66edb78a2678b7d3"
};

var app=initializeApp(firebaseConfig);
var auth=getAuth(app);

export default auth;