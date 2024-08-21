import { 
    auth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from '/FirebaseConfig.js';
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const provider = new GoogleAuthProvider();
const db = getFirestore();

function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            console.log(user);
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.experienced === "true") {
                    window.location.href = '/Pages/ElderProfile/ElderProfile.html';
                } else if (userData.experienced === "false") {
                    window.location.href = '/Pages/YoungProfile/YoungProfile.html';
                } else {
                    console.error("Unexpected value for 'experienced' field");
                }
            } else {
                console.error("No such document!");
            }
        }).catch((error) => {
            console.error(error.code, error.message);
        });
}

function signOutUser() {
    signOut(auth).then(() => {
        alert("You have signed out successfully!");
    }).catch((error) => {
        console.error(error);
    });
}

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const signUpButton = document.getElementById("signUpButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

signInButton.addEventListener('click', () => {
    signInWithGoogle();
});

signOutButton.addEventListener('click', () => {
    signOutUser();
});

signUpButton.addEventListener('click', () => {
    window.location.href = '/Pages/EnteryScreen/BeforeRegister.html';
});

onAuthStateChanged(auth, (user) => {
    if(user) {
        signOutButton.style.display = "block";
        message.style.display = "block";
        userName.textContent = user.displayName;
        userEmail.textContent = user.email;
    } else {
        signOutButton.style.display = "none";
        message.style.display = "none";
    }
});