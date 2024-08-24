import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const firebaseConfig = {
        apiKey: "your_api_key",
        authDomain: "your_project_id.firebaseapp.com",
        projectId: "your_project_id",
        storageBucket: "your_project_id.appspot.com",
        messagingSenderId: "your_sender_id",
        appId: "your_app_id"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const profilesContainer = document.querySelector('.contacts-profile-cards');

    profilesContainer.innerHTML = ''; // Clear all static profile cards on load

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Logged-in user:", user.uid, user.displayName); // Log user ID and name
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log(`User Data for ${user.displayName}:`, userData); // Additional logging
                    const contactsIds = [...userData.FriendRequests, ...userData.Friends];
                    contactsIds.forEach(contactId => {
                        const contactRef = doc(db, "users", contactId);
                        getDoc(contactRef).then(contactSnap => {
                            if (contactSnap.exists()) {
                                createProfileCard(contactSnap.data(), profilesContainer);
                            }
                        });
                    });
                } else {
                    console.log("No user data available.");
                }
            });
        } else {
            console.log("No user is signed in.");
        }
    });

    function createProfileCard(userData, container) {
        const card = document.createElement('div');
        card.className = 'contacts-profile-card';

        const link = document.createElement('a');
        link.href = "/Pages/YoungCard/YoungCard.html"; // Adjust as necessary

        const img = document.createElement('img');
        img.className = 'contacts-profile-img';
        img.src = userData.profilePicture || '/public/icons/default_profile_pic.jpg';
        img.alt = 'Profile Image';

        const name = document.createElement('h2');
        name.textContent = userData.fullName;

        const location = document.createElement('p');
        location.textContent = userData.neighborhood;

        link.appendChild(img);
        card.appendChild(link);
        card.appendChild(name);
        card.appendChild(location);

        container.appendChild(card);
    }
});
