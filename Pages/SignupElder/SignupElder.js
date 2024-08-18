import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
    authDomain: "bridgen-988cb.firebaseapp.com",
    databaseURL: "https://bridgen-988cb-default-rtdb.firebaseio.com",
    projectId: "bridgen-988cb",
    storageBucket: "bridgen-988cb.appspot.com",
    messagingSenderId: "1092821735169",
    appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get form data
      const fullName = document.getElementById('fullName').value || user.displayName;
      const age = document.getElementById('age').value;
      const neighborhood = document.getElementById('neighborhood').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const aboutMe = document.getElementById('aboutMe').value;
      const profilePicture = document.getElementById('profilePicture').files[0];

      // Upload profile picture if provided
      let profilePictureUrl = user.photoURL;
      if (profilePicture) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Prepare user data
      const userData = {
        fullName,
        age: Number(age),
        neighborhood,
        phoneNumber,
        aboutMe,
        email: user.email,
        profilePictureUrl,
        experienced: localStorage.getItem('userType') === 'experienced' ? "true" : "false"
      };

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);
      console.log('User data saved successfully');
     
      // Redirect to profile page
      window.location.href = `/Pages/ElderProfile/ElderProfile.html?uid=${user.uid}`;
    } catch (error) {
      console.error("Error during signup:", error.message, error.stack);
      alert("An error occurred during signup. Please try again.");
    }
  });
});

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
//     authDomain: "bridgen-988cb.firebaseapp.com",
//     databaseURL: "https://bridgen-988cb-default-rtdb.firebaseio.com",
//     projectId: "bridgen-988cb",
//     storageBucket: "bridgen-988cb.appspot.com",
//     messagingSenderId: "1092821735169",
//     appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

// document.addEventListener('DOMContentLoaded', () => {
//   const signupForm = document.getElementById('signupForm');

//   signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     try {
//       // Sign in with Google
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Get form data
//       const fullName = document.getElementById('fullName').value || user.displayName;
//       const age = document.getElementById('age').value;
//       const neighborhood = document.getElementById('neighborhood').value;
//       const phoneNumber = document.getElementById('phoneNumber').value;
//       const aboutMe = document.getElementById('aboutMe').value;

//       // Prepare user data
//       const userData = {
//         fullName,
//         age: Number(age),
//         neighborhood,
//         phoneNumber,
//         aboutMe,
//         email: user.email,
//         profilePictureUrl: user.photoURL,
//         מנוסה: true
//       };

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", user.uid), userData);

//       console.log('User data saved successfully');
      
//       // Redirect to profile page
//       window.location.href = `/Pages/ElderProfile/ElderProfile.html?uid=${user.uid}`;
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("An error occurred during signup. Please try again.");
//     }
//   });
// });