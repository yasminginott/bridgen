import { 
    auth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from '/FirebaseConfig.js';

const provider = new GoogleAuthProvider();

const noviceButton = document.getElementById("noviceButton");
const experiencedButton = document.getElementById("experiencedButton");

const handleUserType = (userType) => {
    localStorage.setItem('userType', userType); 
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            // Note: Both paths lead to SignupElder.html. You might want to differentiate this in the future.
            window.location.href = '/Pages/SignupElder/SignupElder.html';
        }).catch((error) => {
            console.error(error.code, error.message);
        });
};

experiencedButton.addEventListener('click', () => handleUserType('experienced'));
noviceButton.addEventListener('click', () => handleUserType('novice'));

// noviceButton.addEventListener('click', () => handleUserType('novice'));
// experiencedButton.addEventListener('click', () => handleUserType('experienced'));