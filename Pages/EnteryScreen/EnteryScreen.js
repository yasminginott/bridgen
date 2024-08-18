import { 
    auth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from '/FirebaseConfig.js';

const provider = new GoogleAuthProvider();

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

function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = '/Pages/ElderProfile/ElderProfile.html';
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

// document.getElementById('login-btn').addEventListener('click', function() {
//     window.location.href = '/Pages/GoogleLogin/GoogleLogin.html'; });

//     document.getElementById('signup-btn').addEventListener('click', function() {
//         window.location.href = '/Pages/SignupElder/SignupElder.html'; });


