import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
    authDomain: "bridgen-988cb.firebaseapp.com",
    projectId: "bridgen-988cb",
    storageBucket: "bridgen-988cb.appspot.com",
    messagingSenderId: "1092821735169",
    appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Get the user's document from Firestore
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Update the HTML with the user's data
                    document.getElementById('fullName').textContent = userData.fullName;
                    document.getElementById('neighborhood').textContent = userData.neighborhood;
                    document.getElementById('aboutMe').textContent = userData.aboutMe;
                    document.getElementById('phoneNumber').textContent = userData.phoneNumber;
                    document.getElementById('profilePicture').src = userData.profilePictureUrl || 'default_image.png'; // Set a default image if profilePictureUrl is not set
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            console.log("No user is signed in");
            window.location.href = '/Pages/EnteryScreen/EnteryScreen.html';
        }
    });
});
