import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

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
        const auth = getAuth();
        const database = getDatabase(app);
        const storage = getStorage(app);    

        document.addEventListener('DOMContentLoaded', function() {
            const signupForm = document.getElementById('signupForm');
        
            signupForm.addEventListener('submit', async function(event) {
                event.preventDefault();
        
                const user = auth.currentUser;
                if (!user) {
                    console.error('No user signed in');
                    return;
                }
        
                const fullName = document.getElementById('fullName').value;
                const age = document.getElementById('age').value;
                const neighborhood = document.getElementById('neighborhood').value;
                const phoneNumber = document.getElementById('phoneNumber').value;
                const aboutMe = document.getElementById('aboutMe').value;
                const profilePicture = document.getElementById('profilePicture').files[0];
        
                let profilePictureUrl = '';
                if (profilePicture) {
                    const imageRef = storageRef(storage, `profile_pictures/${user.uid}`);
                    await uploadBytes(imageRef, profilePicture);
                    profilePictureUrl = await getDownloadURL(imageRef);
                }
        
                const userData = {
                    fullName,
                    age,
                    neighborhood,
                    phoneNumber,
                    aboutMe,
                    profilePictureUrl
                };
        
                try {
                    await set(ref(database, 'users/' + user.uid), userData);
                    console.log('User data saved successfully');
                    window.location.href = '/Pages/AddSkill/AddSkill.html';
                } catch (error) {
                    console.error('Error saving user data:', error);
                }
            });
        });
