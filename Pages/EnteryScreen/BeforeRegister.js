import { 
    auth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from '/FirebaseConfig.js';

const provider = new GoogleAuthProvider();

const noviceButton = document.getElementById("noviceButton");
const experiencedButton = document.getElementById("experiencedButton");

const handleUserType = (userType) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = `/Pages/SignupElder/SignupElder.html?userType=${userType}`;
        }).catch((error) => {
            console.error(error.code, error.message);
        });
};

experiencedButton.addEventListener('click', () => handleUserType('experienced'));
noviceButton.addEventListener('click', () => handleUserType('novice'));