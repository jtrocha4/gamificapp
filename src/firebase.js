import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA68ulo5A_3zEwvgZOHWGkjvoFG3HTPxTs",
    authDomain: "gamificapp-173af.firebaseapp.com",
    projectId: "gamificapp-173af",
    storageBucket: "gamificapp-173af.appspot.com",
    messagingSenderId: "671132187187",
    appId: "1:671132187187:web:61f8edad16913c2e438146"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export { db, auth}