import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
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
    const storage = getStorage(app);

    const editIcon = document.getElementById("edit-button");
    const editableElements = ["elder_name", "elder_location", "elder_description"];
    let isEditing = false;
    let currentUserData = null;
    let currentUserId = null;

    const saveButton = document.createElement("button");
    saveButton.textContent = "שמור";
    saveButton.style.display = "none";
    saveButton.id = "save-button";
    editIcon.parentNode.insertBefore(saveButton, editIcon.nextSibling);

    function fetchAndDisplayUserData(userId) {
        console.log("Fetching data for user ID:", userId);
        const docRef = doc(db, "users", userId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Fetched user data:", userData);
                
                // Update HTML elements with data from Firebase
                document.getElementById('elder_name').textContent = userData.fullName || "No Name";
                document.getElementById('elder_location').textContent = userData.neighborhood || "No Location";
                document.getElementById('elder_description').textContent = userData.aboutMe || "No Description";
    
                // Fetch and set profile picture
                const storageRef = ref(storage, `profile_pictures/${userId}`);
                getDownloadURL(storageRef)
                    .then((url) => {
                        document.querySelector('.profile-img').src = url;
                        console.log("Profile picture URL:", url);
                    })
                    .catch((error) => {
                        console.error("Error getting profile picture:", error);
                        // Set a default image if there's an error
                        document.querySelector('.profile-img').src = '/public/icons/default_profile_pic.jpg';
                    });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.uid);
            currentUserId = user.uid;
            // currentUserId = 'Qn7eTxuHvZeD5a165jvTvqWwTnp2';
            fetchAndDisplayUserData(currentUserId);
        } else {
            console.log("No user is signed in.");
            window.location.href = '/Pages/GoogleLogin/GoogleLogin.html';
        }
    });

    editIcon.addEventListener("click", function() {
        isEditing = !isEditing;
        
        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
            element.contentEditable = isEditing;
            element.classList.toggle("editable", isEditing);
        });

        editIcon.classList.toggle("editing");
        saveButton.style.display = isEditing ? "inline" : "none";
    });

    saveButton.addEventListener("click", function() {
        isEditing = false;
        
        const updatedData = {
            fullName: document.getElementById('elder_name').textContent,
            neighborhood: document.getElementById('elder_location').textContent,
            aboutMe: document.getElementById('elder_description').textContent
        };
    
        const userRef = doc(db, "users", currentUserId);
        updateDoc(userRef, updatedData).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    
        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
            element.contentEditable = false;
            element.classList.remove("editable");
        });
    
        editIcon.classList.remove("editing");
        saveButton.style.display = "none";
    });

    document.getElementById('add_skill_button').addEventListener('click', function() {
        window.location.href = '/Pages/AddSkill/AddSkill3.html';
    });

    fetchAndDisplayUserData(currentUserId)
});

