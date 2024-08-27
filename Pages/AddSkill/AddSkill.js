
// document.getElementById('end_form_button').addEventListener('click', function() {
//     window.location.href = '/Pages/ElderProfile/ElderProfile.html'; // Replace with your target HTML file name
// });


import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    const backArrow = document.getElementById('backArrow');

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Fetch the current user's data
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    // Determine the correct profile page based on the user's experience level
                    if (userData.experienced === "true") {
                        backArrow.href = `https://bridgen.vercel.app/Pages/ElderCard/ElderCard.html?uid=${user.uid}`;
                    } else {
                        backArrow.href = `https://bridgen.vercel.app/Pages/YoungCard/YoungCard.html?uid=${user.uid}`;
                    }
                } else {
                    console.log("No user data available.");
                }
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        } else {
            console.log("No user is signed in.");
        }
    });
});
