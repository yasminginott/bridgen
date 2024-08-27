// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";


    // Firebase configuration (replace with your own Firebase config)
    const firebaseConfig = {
        apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
        authDomain: "bridgen-988cb.firebaseapp.com",
        databaseURL: "https://bridgen-988cb-default-rtdb.firebaseio.com",
        projectId: "bridgen-988cb",
        storageBucket: "bridgen-988cb.appspot.com",
        messagingSenderId: "1092821735169",
        appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // Authenticate and set up the user session
    onAuthStateChanged(auth, user => {
        if (user) {
            setupFormEventListeners(user.uid);
        } else {
            window.location.href = '/Pages/EnteryScreen/EnteryScreen.html'; // Redirect if not logged in
        }
    });

    // Handle the back arrow functionality
    const backArrow = document.getElementById('backArrow');
    backArrow.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        window.history.back(); // Go back to the previous page in history
    });
});

