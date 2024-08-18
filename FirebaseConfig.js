import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
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

export { 
    auth, 
    db, 
    storage, 
    onAuthStateChanged, 
    doc, 
    setDoc, 
    ref, 
    uploadBytes, 
    getDownloadURL 
};

// // FirebaseConfig.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
//     authDomain: "bridgen-988cb.firebaseapp.com",
//     databaseURL: "https://bridgen-988cb-default-rtdb.firebaseio.com",
//     projectId: "bridgen-988cb",
//     storageBucket: "bridgen-988cb.appspot.com",
//     messagingSenderId: "1092821735169",
//     appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { 
//     app, 
//     auth, 
//     db, 
//     storage, 
//     GoogleAuthProvider, 
//     signInWithPopup, 
//     signOut, 
//     onAuthStateChanged 
// };